import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import compAccount from '../screens/screensAccount/Account'
import compLogin from '../screens/screensAccount/Login'
import compRegister from '../screens/screensAccount/Register'
import compRecoverPassword from '../screens/screensAccount/RecoverPassword'
import ScreenHome from '../screens/Home'

const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: 'none',
            }}
        >
            <Stack.Screen
                name="stackaccount"
                component={compAccount}
                options={{ title: "Cuenta" }}
            />
            <Stack.Screen
                name="stacklogin"
                component={compLogin}
                options={{ title: "Iniciar Sesión" }}
            />
            <Stack.Screen
                name="stackregister"
                component={compRegister}
                options={{ title: "Registrar Usuario" }}
            />
            <Stack.Screen
                name="stackrecover-password"
                component={compRecoverPassword}
                options={{ title: "Recuperar Contraseña" }}
            />
            <Stack.Screen
                    name="screenhome"
                    component={ScreenHome}
                    options={{
                        //headerShown: false,
                        title: "Home"
                    }}
                />
        </Stack.Navigator>
    )
}
