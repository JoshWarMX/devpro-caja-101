import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from "@rneui/base"

import RestaurantsStack from './RestaurantsStack'
import FavoritesStack from './FavoritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'
import ScreenHome from '../screens/Home'

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
            case "top-restaurants":
                iconName = "barcode-outline"
                break;
            case "search":
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
                    component={RestaurantsStack}
                    options={{ title: "Caja" }}
                />
                <Tab.Screen
                    name="favorites"
                    component={FavoritesStack}
                    options={{ title: "Ventas" }}
                />
                <Tab.Screen
                    name="top-restaurants"
                    component={TopRestaurantsStack}
                    options={{ title: "Productos" }}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
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
