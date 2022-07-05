import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import RegisterForm from '../../components/comAccount/RegisterForm'
//react-native-keyboard-aware-scroll-view

export default function Register() {
    const navigation = useNavigation()
    return (
        <View>
            <RegisterForm/>
        </View>
    )
}

const styles = StyleSheet.create({})