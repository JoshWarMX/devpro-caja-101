import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Counter from '../screens/screensCounter/Counter'
import NewSale from '../screens/screensCounter/NewSale'

Stack = createStackNavigator()

export default function CounterStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'none',
      }}
    >
      <Stack.Screen
        name="Counter"
        component={Counter}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name="NewSale"
        component={NewSale}
        options={{ title: "Nueva Venta" }}
      />
    </Stack.Navigator>
  )
}

