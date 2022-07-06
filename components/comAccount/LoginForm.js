import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Button } from '@rneui/base'
import Loading from '../Loading'
import { useNavigation } from '@react-navigation/native'
import { validateEmail } from '../../utils/helper'
import { isEmpty } from 'lodash'

import { actLodinWithEmailAndPassword } from '../../database/action'


export default function LoginForm() {
    const navigation = useNavigation()
    const [showPassword, setshowPassword] = useState(false)
    const [formdata, setformdata] = useState(defaultFromValue)
    const [errorEmail, seterrorEmail] = useState("")
    const [errorPassword, seterrorPassword] = useState("")
    const [loading, setloading] = useState(false)

    const onChange = (e, type) => {
        setformdata({ ...formdata, [type]: e.nativeEvent.text })
    }

    const doLogin = async () => {
        if (!ValidateData()) {
            return
        }
        setloading(true)
        const result = await actLodinWithEmailAndPassword(formdata.email, formdata.password)
        setloading(false)
        if (!result.statusResponse) {
            seterrorEmail(result.error)
            return
        }
        navigation.navigate("stackaccount")
    }

    const ValidateData = () => {
        seterrorEmail("")
        seterrorPassword("")
        let isValid = true

        if (!validateEmail(formdata.email)) {
            seterrorEmail("Email inválido")
            isValid = false
        }
        if (isEmpty(formdata.password)) {
            seterrorPassword("Ingresa tu contraseña")
            isValid = false
        }

        return isValid

    }

    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu Email"
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formdata.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu Contraseña"
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formdata.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.iconRight}
                        onPress={() => setshowPassword(!showPassword)}
                    />
                }
            />
            <Button
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Iniciar Sesion"
                onPress={() => doLogin()} />
            <Loading isVisible={loading} text='Iniciando Sesion' />
        </View>
    )
}

const defaultFromValue = () => {
    return { email: "", password: ""}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }

})