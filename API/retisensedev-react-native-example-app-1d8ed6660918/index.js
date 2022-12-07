/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-wasm';
//import './assets/AnalyticsLib.js'
import { Module } from './assets/AnalyticsLib';

Module.onRuntimeInitialized = () =>{
  const SetDebugMode = Module.cwrap('SetDebugMode', '', ['number']);
  const InitUser = Module.cwrap('InitUser', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
  const GetRevNumber = Module.cwrap('GetRevNumber', 'number', ['']);
  const GetUserInfo_wt = Module.cwrap('GetUserInfo_wt', 'number', ['']);
  const test_analyticslib = Module.cwrap('test_analyticslib', 'number', ['']);

  console.log(SetDebugMode(1));
  console.log(InitUser(175, 72000, 26, 28, 1, 0, 0));
  console.log(GetRevNumber());
  console.log(GetUserInfo_wt());
  console.log(test_analyticslib());

};


AppRegistry.registerComponent(appName, () => App);
