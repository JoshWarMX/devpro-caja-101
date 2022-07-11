import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Products from '../screens/screensProducts/Products'
import AddProducts from '../screens/screensProducts/AddProducts'
import BarcodeScan from '../screens/screensProducts/BarcodeScan'

const Stack = createStackNavigator()

export default function ProductsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'none',
      }}>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: 'Products',
        }}
      />
      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={{
          title: 'Agregar Producto',
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
    </Stack.Navigator>
  )
}

