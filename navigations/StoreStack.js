import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Store from '../screens/screenStore/Store'
import EnterMerch from '../screens/screenStore/EnterMerch'
import BarcodeScan from '../screens/screenStore/BarcodeScan'
import TakePhoto from '../components/TakePhoto'

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
        component={BarcodeScan}
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

