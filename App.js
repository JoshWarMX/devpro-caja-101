import "./ignoreWarnings"; // import at the very top of everything.
//import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet } from 'react-native';
import Navigation from './navigations/Navigation';

import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default function App() {

  return (
    <Navigation />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
