import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from "@rneui/base"

import ProductsStack from './ProductsStack'
import FavoritesStack from './FavoritesStack'
import CounterStack from './CounterStack'
import StoreStack from './StoreStack'
import AccountStack from './AccountStack'


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();

export default function Navigation() {
    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "restaurants":
                iconName = "cart-outline"
                break;
            case "favorites":
                iconName = "cash-outline"
                break;
            case "products":
                iconName = "barcode-outline"
                break;
            case "store":
                iconName = "business-outline"
                break;
            case "account":
                iconName = "person-outline"
                break;
        }


        return (
            <Icon
                type="ionicon"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaurants"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                    tabBarInactiveTintColor: "#a17dc3",
                    tabBarActiveTintColor: "#442484"
                }
                )}
            >
                <Tab.Screen
                    name="restaurants"
                    component={CounterStack}
                    options={{ title: "Caja" }}
                />
                <Tab.Screen
                    name="favorites"
                    component={FavoritesStack}
                    options={{ title: "Ventas" }}
                />
                <Tab.Screen                    
                    name="products"
                    component={ProductsStack}
                    options={{ title: "Productos" }}
                />
                <Tab.Screen
                    name="store"
                    component={StoreStack}
                    options={{ title: "Almacen" }}
                />
                <Tab.Screen                    
                    name="account"
                    component={AccountStack}
                    options={{
                        //headerShown: false,
                        title: "Cuenta"
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}
