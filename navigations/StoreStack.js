import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import FindProductsStore from '../screens/screenStore/FindProductsStore'

Stack = createStackNavigator()

export default function StoreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FindProductsStore"
        component={FindProductsStore}
        options={{
          title: 'Buscar Productos',
        }}
      />
    </Stack.Navigator>
  )
}

