import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import fs, { readFileAssets, stat } from 'react-native-fs';
//import { BleManager } from 'react-native-ble-plx';
import { data } from './App/Schema';
import SoundPlayer from 'react-native-sound-player';
import "react-native-wasm";
import { Buffer } from 'buffer';

import BleManager from 'react-native-ble-manager';
import { NativeAppEventEmitter } from 'react-native';
import { WebView } from 'react-native-webview';

import { Module } from './assets/AnalyticsLib'; 

const App = ({ params }) => {

  let [form, setForm] = useState({ name: '', runTime: '' });
  let [showData, setShowData] = useState(false);
  let [allData, setAllData] = useState([]);

  const SetSensorSpecNew = Module.cwrap('SetSensorSpecNew', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
  const ProcessStride_FSR = Module.cwrap('ProcessStride_FSR', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
  const ProcessStride_FSR_grid = Module.cwrap('ProcessStride_FSR_grid', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);

  let dataCount = 0;
  let connectedDevice;
  let devices = [];
  let deviceDiscovered = [];

  let deviceCharacteristic;
  let deviceService;
  let hwRevNumber;
  let hwRevService;
  let devType;

  let WASM;

  let SERVICE = '1814';
  let CHARACTERISTIC = '2A53';

  //Init BleManager
  BleManager.start({showAlert: false});

  NativeAppEventEmitter.addListener('BleManagerDiscoverPeripheral',(data) => {
    if(data.name != null && data.rssi > -60) {
      if(!deviceDiscovered.includes(data.id)) {
        deviceDiscovered.push(data.id);
        devices.push(data);
        console.log(deviceDiscovered.length, ": " ,data) // Name of peripheral device
      }
    }
  });

  BleManager.scan(["1814"], 60, false).then(() => {
    // Success code
    console.log("Scan started");
  });

  let addData = () => {
    if(deviceDiscovered.length >= 1){
      BleManager.stopScan().then(() => {
        console.log("Scan Stopped");
      });

      BleManager.connect(deviceDiscovered[0])
      .then(() => {

        BleManager.retrieveServices(deviceDiscovered[0], ['180A']).then(
          (peripheralInfo) => {
            // Success code
            peripheralInfo.characteristics.forEach((char) => {
              if(char.characteristic == '2a27'){
                deviceCharacteristic = char
                deviceService = char.service

                console.log("deviceCharacteristic: ", deviceCharacteristic)
                console.log("deviceService: ", deviceService)
              }
            });

            console.log("Peripheral info: ", peripheralInfo.characteristics);

            BleManager.read(
              deviceDiscovered[0],
              deviceService, deviceCharacteristic.characteristic
            ).then((readData) => {
                const buffer = Buffer.from(readData);
                const data = buffer.toString();
                console.log("Hardware Revision Number : " + data);

                hwRevNumber = data;

                switch (hwRevNumber) {

                  case "STRD_PRS_01_285":
                      SetSensorSpecNew(0, 0, 0, 0, 0, 0, 0, 0, 3, 20, 1);
                      SetSensorSpecNew(0, 0, 0, 0, 0, 0, 0, 0, 3, 20, 0);
                      devType = "grid";
                      break;
          
                  case "STRD_PRS_02_27":
                  case "STRD_PRS_01_27":
                      SetSensorSpecNew(0, 0, 0, 0, 0, 0, 0, 0, 3, 22, 1);
                      SetSensorSpecNew(0, 0, 0, 0, 0, 0, 0, 0, 3, 22, 0);
                      devType = "grid";
                      break;
          
                  case "STRD_PRS_02_24":
                  case "STRD_PRS_01_24":
                      SetSensorSpecNew(0, 0, 0, 0, 0, 0, 0, 0, 3, 23, 1);
                      SetSensorSpecNew(0, 0, 0, 0, 0, 0, 0, 0, 3, 23, 0);
                      devType = "grid";
                      break;
          
                  case "STRD_INSAE_10":
                      SetSensorSpecNew(23, 21, 19, 20, 17, 18, 24, 22, 2, 6, 1);
                      SetSensorSpecNew(23, 21, 19, 20, 17, 18, 24, 22, 2, 6, 0);
                      devType = "discrete";
                      break;
          
                  case "STRD_INSAE_12":
                  case "STRD_INSAE_11":
                      SetSensorSpecNew(20, 18, 19, 23, 17, 21, 24, 22, 2, 6, 1);
                      SetSensorSpecNew(20, 18, 19, 23, 17, 21, 24, 22, 2, 6, 0);
                      devType = "discrete";
                      break;
          
                  case "STRD_PRFI_02":
                  case "STRD_INSI_02":
                      SetSensorSpecNew(7, 9, 8, 0, 4, 0, 6, 5, 2, 6, 1);
                      SetSensorSpecNew(7, 9, 8, 0, 4, 0, 6, 5, 2, 6, 0);
                      devType = "discrete";
                      break;
          
                  case "STRD_PRFI_01":
                      SetSensorSpecNew(7, 9, 8, 8, 4, 8, 6, 5, 2, 6, 1);
                      SetSensorSpecNew(7, 9, 8, 8, 4, 8, 6, 5, 2, 6, 0);
                      devType = "discrete";
                      break;
                  case "STRD_INS3_02":
                      SetSensorSpecNew(5, 9, 6, 7, 4, 0, 8, 0, 2, 3, 1);
                      SetSensorSpecNew(8, 4, 7, 6, 9, 0, 5, 0, 2, 3, 0);
                      devType = "discrete";
                      break;
                  case "STRD_INSAE_05":
                      SetSensorSpecNew(10, 8, 6, 7, 4, 5, 11, 9, 2, 5, 1);
                      SetSensorSpecNew(10, 8, 6, 7, 4, 5, 11, 9, 2, 5, 0);
                      devType = "discrete";
                      break;
                  case "STRD_INSI_02":
                      SetSensorSpecNew(7, 9, 4, 0, 8, 0, 6, 5, 2, 6, 1);
                      SetSensorSpecNew(7, 9, 4, 0, 8, 0, 6, 5, 2, 6, 0);
                      devType = "discrete";
                      break;
                  default:
                      break;
               }

               console.log("device Type : " + devType);
              })
              .catch((error) => {
                // Failure code
                console.log(error);
              });
          }
        );
        
        
        connectedDevice = devices[0];
        console.log("Connected");
        console.log("connectedDevice: " + connectedDevice);
      })
      .catch((error) => {
          // Failure code
          console.log(error);
      });
    }
  };

  let isNotify = false

  let startNotif = () => {

    if(isNotify) {
      BleManager.stopNotification(connectedDevice.id, '1814', '2A53').then(()=>{
        console.log("Notification stopped");
        isNotify = false
      });
    } else {

      BleManager.retrieveServices(connectedDevice.id, ['1814']).then(() => {
          BleManager.startNotification(connectedDevice.id, '1814', '2A53').then(()=>{
            console.log("Notification started");
            isNotify = true
          });
      });
      
      NativeAppEventEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', (buffer) => {
        dataCount += 1;

        var data = new Uint8Array(buffer.value);
        //console.log("buffer.value: ", data);
        var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
        var dataPtr = Module._malloc(nDataBytes);

        var dataHeap = new Uint8Array( Module.HEAPU8.buffer, dataPtr, nDataBytes);
        dataHeap.set(new Uint8Array(data.buffer));

        var isLeft = 1;

        if(devType == "discrete"){
          let result =  ProcessStride_FSR(dataHeap.byteOffset, data.length, 0, 0, 0, isLeft, 0, 0, 1, 1);
          console.log(result)
        } else if(devType == "grid") {
          var result = ProcessStride_FSR_grid(dataHeap.byteOffset, data.length, 0, 0, 0, isLeft, 0, 0, 1);
          console.log(result)
        }

        // if(dataCount%50 == 0){
        //   //console.log("result", result);
        //   console.log('characteristic update : ',dataCount,' :', buffer.value);
        // }
      });
    }
  };


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      {}

      <TouchableOpacity
        onPress={() => {
          addData();
        }}
        activeOpacity={0.7}
        style={styles.button}>
        <Text style={styles.TextStyle}>
          {' '}
          Connect, check logs for device info.{' '}
        </Text>
      </TouchableOpacity>

      {}
      <Text
        onPress={() => {
          startNotif();
        }}
        style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>
        Start/Stop Notfications. Check logs.
      </Text>
      {showData && (
        <ScrollView style={{ flex: 1, width: '100%', marginTop: 20 }}>
          {allData.map(d => {
            if (d.name == '') {
              return null;
            }
            return (
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#ccc',
                  marginBottom: 10,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Text>Name : {d.name}</Text>
                <Text>Run Time : {d.runTime}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};
let styles = StyleSheet.create({
  button: {
    backgroundColor: '#AAA',
    padding: 5,
    borderRadius: 10,
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  TextStyle: {},
});
export default App;
