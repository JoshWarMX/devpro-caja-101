import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, Input } from "@rneui/base"
import { validateEmail } from '../../utils/helper'
import { size } from 'lodash'
import { actRegisterUser } from '../../database/action'
import { useNavigation } from '@react-navigation/native'
import Loading from '../Loading'

export default function RegisterForm() {
    const navigation = useNavigation()
    const [showPassword, setshowPassword] = useState(false)
    const [formdata, setformdata] = useState(defaultFromValue)
    const [errorEmail, seterrorEmail] = useState("")
    const [errorPassword, seterrorPassword] = useState("")
    const [errorConfirm, seterrorConfirm] = useState("")
    const [loading, setloading] = useState(false)

    const onChange = (e, type) => {
        setformdata({ ...formdata, [type]: e.nativeEvent.text })
    }

    const registerUser = async () => {
        if (!ValidateData()) {
            return
        }
        setloading(true)
        const result = await actRegisterUser(formdata.email, formdata.password)
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
        seterrorConfirm("")
        let isValid = true

        if (!validateEmail(formdata.email)) {
            seterrorEmail("Email inválido")
            isValid = false
        }

        if (size(formdata.password) < 6) {
            seterrorPassword("La contraseña debe tener al menos 6 caracteres")
            isValid = false
        }

        if (formdata.password !== formdata.confirm) {
            seterrorPassword("Las contraseñas no coinciden")
            seterrorConfirm("Las contraseñas no coinciden")
            isValid = false
        }

        return isValid

    }


    return (
        <View style={styles.form}>
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
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu Contraseña"
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formdata.confirm}
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
                title="Registrar Nuevo Usuario"
                onPress={() => registerUser()} />
            <Loading isVisible={loading} text='Creando Usuario' />
        </View>
    )
}

const defaultFromValue = () => {
    //return { email: "", password: "", confirm: "" }
    return { email: "josue@hotmail.com", password: "1234567", confirm: "1234567" }
}

const styles = StyleSheet.create({
    form: {
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