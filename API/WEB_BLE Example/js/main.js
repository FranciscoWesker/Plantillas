Module.onRuntimeInitialized = _ => {
    
  let connectButton = document.getElementById('connect');
  let disconnectButton = document.getElementById('disconnect');
  let terminalContainer = document.getElementById('terminal');
  let sendForm = document.getElementById('send-form');
  let inputField = document.getElementById('input');
  const btnEnable = document.getElementById("readnotifications");
  var btnLeft =document.getElementById("lConnect");
  var btnRight=document.getElementById("rConnect");
  
  let leftConfigActive = false;
  let rightConfigActive = false;
  let leftNotifActive = true;
  let rightNotifActive = true;
  let leftDeviceCache = null;
  let rightDeviceCache=null;
  let myLeftchar = null;
  let myRightchar=null;
  let characteristicCache = null;
  let myHWRevNum = null;
  let myFWRevNum = null;
  
    const GetRevNumber = Module.cwrap('GetRevNumber', 'number', ['']);
    const SetDebugMode = Module.cwrap('SetDebugMode', '', ['number']);
    const InitUser = Module.cwrap('InitUser', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
    const SetSensorSpecNew = Module.cwrap('SetSensorSpecNew', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
    const ProcessStride_FSR_grid = Module.cwrap('ProcessStride_FSR_grid', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
    const ProcessStride_FSR_bb_grid = Module.cwrap('ProcessStride_FSR_bb_grid', 'number', ['number', 'number', 'number', 'number', 'number']);

    const GetCurrStride_time = Module.cwrap('GetCurrStride_time', 'number', ['number']);
    const GetStride_gct = Module.cwrap('GetStride_gct', 'number', ['number', 'number']);
    const GetStride_strideRate = Module.cwrap('GetStride_strideRate', 'number', ['number', 'number']);
    const GetStride_strideLength = Module.cwrap('GetStride_strideLength', 'number', ['number', 'number']);
    const GetCurrStride_strike_type = Module.cwrap('GetCurrStride_strike_type', 'number', ['number']);
    const GetCurrStride_count = Module.cwrap('GetCurrStride_count', 'number', ['number']);
    const GetCurrStride_a_x = Module.cwrap('GetCurrStride_a_x', 'number', ['number']);
    const GetCurrStride_a_y = Module.cwrap('GetCurrStride_a_y', 'number', ['number']);
    const GetCurrStride_a_z = Module.cwrap('GetCurrStride_a_z', 'number', ['number']);
    const GetCurrStride_g_x = Module.cwrap('GetCurrStride_g_x', 'number', ['number']);
    const GetCurrStride_g_y = Module.cwrap('GetCurrStride_g_y', 'number', ['number']);
    const GetCurrStride_g_z = Module.cwrap('GetCurrStride_g_z', 'number', ['number']);

    const GetStress_front = Module.cwrap('GetStress_front', 'number', ['number', 'number']);
    const GetStress_front_2 = Module.cwrap('GetStress_front_2', 'number', ['number', 'number']);
    const GetStress_mid = Module.cwrap('GetStress_mid', 'number', ['number', 'number']);
    const GetStress_arch = Module.cwrap('GetStress_arch', 'number', ['number', 'number']);
    const GetStress_heel = Module.cwrap('GetStress_heel', 'number', ['number', 'number']);
    const GetStress_heel2 = Module.cwrap('GetStress_heel2', 'number', ['number', 'number']);
    const GetStress_hallux = Module.cwrap('GetStress_hallux', 'number', ['number', 'number']);
    const GetStress_toes = Module.cwrap('GetStress_toes', 'number', ['number', 'number']);
    const GetUserInfo_ht = Module.cwrap('GetUserInfo_ht', 'number', ['']);
    const GetRunInfo_time = Module.cwrap('GetRunInfo_time', 'number', ['']);
    const GetRunInfo_strideCount = Module.cwrap('GetRunInfo_strideCount', 'number', ['']);
    const GetMatrixLoadInfo_cell = Module.cwrap('GetMatrixLoadInfo_cell', 'number', ['number', 'number', 'number']);
    const GetMatrixLoadInfo_halfcell = Module.cwrap('GetMatrixLoadInfo_halfcell', 'number', ['number', 'number', 'number', 'number']);
  
  
  console.log(GetRevNumber(10));
  SetDebugMode(1);
  
  InitUser (175, 72000, 26, 28, 1, 0, 0);
  
  console.log(GetUserInfo_ht());
  
  btnLeft.onclick = function(){
      console.log(btnLeft.classList.value)
      leftConfigActive = true;
      if (btnLeft.classList.contains("lConnect")){
          connect()
          .then(() => {
                btnLeft.classList.remove("lConnect")
                btnLeft.classList.add("ldisconnect")
                btnLeft.innerText = "Disconnect"
                
                });
      } else {
          disconnect();
          //            .then(() => {
          btnLeft.classList.add("lConnect")
          btnLeft.classList.remove("ldisconnect")
          btnLeft.innerText = "Left Connect"
          leftConfigActive = false;
          //                  });
          
      }
  }
  
  btnRight.onclick = function(){
      console.log(btnRight.classList.value)
      rightConfigActive = true;
      if (btnRight.classList.contains("rConnect")){
          connect()
          .then(() => {
                btnRight.classList.remove("rConnect")
                btnRight.classList.add("rdisconnect")
                btnRight.innerText = "Disconnect"
                btnEnable.classList.add("enable")
                btnEnable.classList.remove("disable")
                btnEnable.innerText = "Enable Notifications"
                rightConfigActive = false;
                });
      } else {
          disconnect();
          //            .then(() => {
          btnRight.classList.add("rConnect")
          btnRight.classList.remove("rdisconnect")
          btnRight.innerText = "Right Connect"
          btnEnable.classList.add("enable")
          btnEnable.classList.remove("disable")
          btnEnable.innerText = "Enable Notifications"
          rightConfigActive = false;
          
          
          //                  });
      }
  }
  
  // Launch Bluetooth device chooser and connect to the selected
  function connect() {
      return requestBluetoothDevice().
      then(device => connectDeviceAndCacheCharacteristic(device)).
      catch(error => console.log(error.message));
  }
  
  function requestBluetoothDevice() {
      // log('Requesting bluetooth device...');
      
      return navigator.bluetooth.requestDevice({
                                               filters: [{services: [0x1814, 'device_information']},
                                                         {namePrefix: 'Strid'}]
                                               }).
      then(device => {
           deviceCache = device;
           return deviceCache;
           });
  }
  
  // Connect to the device specified, get service and characteristic
  function connectDeviceAndCacheCharacteristic(device) {
      let myServer = null;
      if (device.gatt.connected && characteristicCache) {
          return Promise.resolve(characteristicCache);
      }
      //log('Connecting to GATT server...');
      if (leftConfigActive) {
          btnLeft.innerText = "Connecting..."
      }
      if (rightConfigActive) {
          btnRight.innerText = "Connecting..."
      }
      return device.gatt.connect().
      then(server => {
           if (leftConfigActive) {
           leftDeviceCache = device;
           leftDeviceCache.addEventListener('gattserverdisconnected', onLeftDisconnected);
           btnLeft.innerText = "Disconnect"
           
           }
           if (rightConfigActive) {
           rightDeviceCache = device;
           rightDeviceCache.addEventListener('gattserverdisconnected', onRightDisconnected);
           btnRight.innerText = "Disconnect"
           
           }
           
           return Promise.all([
                               server.getPrimaryService(0x1814)
                               .then (handlePrimaryService),
                               server.getPrimaryService('device_information')
                               .then (handleDevInfoService),
                               ]);
           });
  }
  
  function handlePrimaryService (service) {
      if (service === null) {
          console.log("Service 0x1814 not found");
          return Promise.resolve();
      }
      return service.getCharacteristic(0x2A53)
      .then(characteristic => {
            // log('Characteristic found');
            characteristicCache = characteristic;
            if (leftConfigActive)
            myLeftchar = characteristic;
            if (rightConfigActive)
            myRightchar = characteristic;
            return characteristicCache;
            
            });
  }
  
  function handleDevInfoService (service) {
      if (service === null) {
          console.log("Service device_information not found");
          return Promise.resolve();
      }
      return service.getCharacteristics()
      .then(characteristics => {
            // log('Characteristic found');
            let queue = Promise.resolve();
            
            let decoder = new TextDecoder('utf-8');
            characteristics.forEach(characteristic => {
                                    switch (characteristic.uuid) {
                                    case BluetoothUUID.getCharacteristic('hardware_revision_string'):
                                    queue = queue.then(_ => characteristic.readValue()).then(value => {
                                                                                             myHWRevNum = decoder.decode(value);
                                                                                             configureDevice (myHWRevNum);
                                                                                             });
                                    break;
                                    
                                    case BluetoothUUID.getCharacteristic('firmware_revision_string'):
                                    queue = queue.then(_ => characteristic.readValue()).then(value => {
                                                                                             myFWRevNum = decoder.decode(value);
                                                                                             });
                                    break;
                                    default: log('> Unknown Characteristic: ' + characteristic.uuid);
                                    }
                                    });
            })
      .catch(error => {
             log('Argh! ' + error);
             });
      
      
  }
  
  function manageNotifications (isLeft, isReset) {
      
      if (isLeft && leftDeviceCache && myLeftchar) {
          if (leftNotifActive) {
              myLeftchar.startNotifications().
              then(() => {
                   //log('Notifications started');
                   // Added line
                   myLeftchar.addEventListener('characteristicvaluechanged',
                                               handleLeftCharValueChanged);
                   });
          } else {
              myLeftchar.removeEventListener('characteristicvaluechanged',
                                             handleLeftCharValueChanged);
              myLeftchar.stopNotifications();
              
              if (isReset)
                  myLeftchar = null;
          }
      }
      if (!isLeft && rightDeviceCache && myRightchar) {
          if (rightNotifActive) {
              myRightchar.startNotifications().
              then(() => {
                   //log('Notifications started');
                   // Added line
                   myRightchar.addEventListener('characteristicvaluechanged',
                                                handleRightCharValueChanged);
                   });
          } else {
              myRightchar.removeEventListener('characteristicvaluechanged',
                                              handleRightCharValueChanged);
              myRightchar.stopNotifications();
              
              if (isReset)
                  myRightchar = null;
          }
      }
  }
  
  btnEnable.onclick = function(){
      console.log(btnEnable.classList.value)
      if (btnEnable.classList.contains("enable")){
          //DO SAVE STUFF...
          leftNotifActive = true;
          rightNotifActive = true;
          manageNotifications (true, false);
          manageNotifications (false, false);
          
          btnEnable.classList.remove("enable")
          btnEnable.classList.add("disable")
          btnEnable.innerText = "Disable Notifications"
          
      } else {
          leftNotifActive = false;
          rightNotifActive = false;
          manageNotifications (true, false);
          manageNotifications (false, false);
          
          btnEnable.classList.add("enable")
          btnEnable.classList.remove("disable")
          btnEnable.innerText = "Enable Notifications"
      }
  }
  
  
  
  function log(data, type = '') {
      // terminalContainer.insertAdjacentHTML('beforeend',
      //     '<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');
  }
  
  function disconnect() {
      if(leftConfigActive && leftDeviceCache){
          //log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
          leftNotifActive = false;
          manageNotifications (true, true);
          leftDeviceCache.removeEventListener('gattserverdisconnected',
                                              onLeftDisconnected);
          
          if (leftDeviceCache.gatt.connected) {
              leftDeviceCache.gatt.disconnect();
              //                .then(() => {
              //                      log('"' + leftDeviceCache.name + '" bluetooth device disconnected');
              //                      });
              
              //                btnLeft.classList.add("lConnect")
              //                btnLeft.classList.remove("ldisconnect")
              //                btnLeft.innerText = "Left Connect"
          }
          else {
              log('"' + leftDeviceCache.name +
                  '" bluetooth device is already disconnected');
          }
          leftDeviceCache = null;
      }
      if(rightConfigActive && rightDeviceCache){
          //log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
          rightNotifActive = false;
          manageNotifications (false), true;
          rightDeviceCache.removeEventListener('gattserverdisconnected',
                                               onRightDisconnected);
          
          if (rightDeviceCache.gatt.connected) {
              rightDeviceCache.gatt.disconnect();
              //                .then(() => {
              //                log('"' + rightDeviceCache.name + '" bluetooth device disconnected');
              //                });
              //                btnRight.classList.add("rConnect")
              //                btnRight.classList.remove("rdisconnect")
              //                btnRight.innerText = "Right Connect"
          }
          else {
              log('"' + rightDeviceCache.name +
                  '" bluetooth device is already disconnected');
          }
          rightDeviceCache = null;
      }
  }
  
  function handleLeftCharValueChanged (event) {
      handleCharacteristicValueChanged (1, event)
  }
  
  function handleRightCharValueChanged (event) {
      handleCharacteristicValueChanged (0, event)
  }
  
  // Data receiving
  function handleCharacteristicValueChanged(isLeft, event) {
      let value = event.target.value;
      let a = [];
      // Convert raw data bytes to hex values just for the sake of showing something.
      // In the "real" world, you'd use data.getUint8, data.getUint16 or even
      // TextDecoder to process raw data bytes.
      for (let i = 0; i < value.byteLength; i++) {
          // a.push(('00' + value.getUint8(i).toString(16)).slice(-2));
          a.push((value.getUint8(i)));
      }
      //console.log('' + a.join(' '));
      
      
      var  data = new Uint8Array(a);
      // Get data byte size, allocate memory on Emscripten heap, and get pointer
      var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
      var dataPtr = Module._malloc(nDataBytes);
      
      // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)
      var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
      dataHeap.set(new Uint8Array(data.buffer));
      
      var result = ProcessStride_FSR_grid (dataHeap.byteOffset, data.length, 0, 0, 0, isLeft, 0, 0, 1);

          imuData.a[1] = GetCurrStride_a_x(isLeft);
          imuData.a[0] = -GetCurrStride_a_y(isLeft);
          imuData.a[2] = GetCurrStride_a_z(isLeft);
          imuData.g[1] = (GetCurrStride_g_x(isLeft));
          imuData.g[0] = -(GetCurrStride_g_y(isLeft));
          imuData.g[2] = (GetCurrStride_g_z(isLeft)) ;

          imuData = lp_filter (imuData);
          
//          console.log ("g_x: "+imuData.g[0]+" g_y: "+imuData.g[1]+" g_z: "+imuData.g[2]+ " scalar_a: "+((imuData.a[0]*imuData.a[0]+imuData.a[1]*imuData.a[1]+imuData.a[2]*imuData.a[2])/1000000.0).toFixed(3));
          
              
           q0 = GetIMUQuat (1, 0);
           q1 = GetIMUQuat (1, 1);
           q2 = GetIMUQuat (1, 2);
           q3 = GetIMUQuat (1, 3);
      
      
      if (result) {
          // Fill stress array with the values obtained, for display on stress map
          var stressBSAHK = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
          var j = -1;
          // Fill left
          stressBSAHK[++j] = GetStress_front(1, 1);
          stressBSAHK[++j] = GetStress_front_2(1, 1);
          stressBSAHK[++j] = GetStress_mid(1, 1);
          stressBSAHK[++j] = GetStress_arch(1, 1);
          stressBSAHK[++j] = GetStress_heel(1, 1);
          stressBSAHK[++j] = GetStress_heel2(1, 1);
          stressBSAHK[++j] = GetStress_hallux(1, 1);
          stressBSAHK[++j] = GetStress_toes(1, 1);
          
          // Fill right
          stressBSAHK[++j] = GetStress_front(1, 0);
          stressBSAHK[++j] = GetStress_front_2(1, 0);
          stressBSAHK[++j] = GetStress_mid(1, 0);
          stressBSAHK[++j] = GetStress_arch(1, 0);
          stressBSAHK[++j] = GetStress_heel(1, 0);
          stressBSAHK[++j] = GetStress_heel2(1, 0);
          stressBSAHK[++j] = GetStress_hallux(1, 0);
          stressBSAHK[++j] = GetStress_toes(1, 0);
          
          
      }
      
      // Free memory
      Module._free(dataHeap.byteOffset);
      
      
  }
  //
  function onLeftDisconnected(event) {
      onDisconnect (1, event);
  }
  function onRightDisconnected(event) {
      onDisconnect (0, event);
  }
  
  function onDisconnect (isLeft, event) {
      let device = event.target;
      if (isLeft) {
          myLeftchar = null;
          leftConfigActive = true;
      } else {
          myRightchar = null;
          rightConfigActive = true;
      }
      
      log('"' + device.name +
          '" bluetooth device disconnected, trying to reconnect...');
      
      connectDeviceAndCacheCharacteristic(device)
      .then(characteristic => {
            manageNotifications (isLeft);
            if (isLeft) {
            leftConfigActive = false;
            } else {
            rightConfigActive = false;
            }
            })
      .catch(error => {
             log(error)
             if (isLeft) {
             leftConfigActive = false;
             } else {
             rightConfigActive = false;
             }
             });
  }
  
  function configureDevice (hwRevNum) {
      if (hwRevNum === null) {
          return;
      }
      switch (hwRevNum) {
          case "STRD_PPP_01":
              SetSensorSpecNew (0,0,0,0,0,0,0,0, 3, 24, 1);
              break;
              
          case "STRD_PRS_01_24":
              SetSensorSpecNew (0,0,0,0,0,0,0,0, 3, 23, 1);
              SetSensorSpecNew (0,0,0,0,0,0,0,0, 3, 23, 0);
              break;
              
          default:
              break;
      }
  }
  
  
};

