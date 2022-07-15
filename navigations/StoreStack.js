import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Store from '../screens/screenStore/Store'
import EnterMerch from '../screens/screenStore/EnterMerch'
import BarcodeScanStore from '../screens/screensProducts/BarcodeScan'
import TakePhoto from '../screens/screensProducts/TakePhoto'

Stack = createStackNavigator()

export default function StoreStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerMode: 'none',
    }}>
      <Stack.Screen
        name="Store"
        component={Store}
        options={{
          title: 'Almacen',
        }}
      />
      <Stack.Screen
        name="EnterMerch"
        component={EnterMerch}
        options={{
          title: 'Ingreso de Mercancia',
        }}
      />
      <Stack.Screen
        name="BarcodeScan"
        component={BarcodeScanStore}
        options={{
          title: 'Barcode',
        }}
        initialParams={{ capture: 'Not scanned yet' }}
      />
      <Stack.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{
          title: 'TakePhoto',
        }}
      />
    </Stack.Navigator>
  )
}

