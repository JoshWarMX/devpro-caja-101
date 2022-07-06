import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, Input } from '@rneui/base'
import { isEmpty } from 'lodash'

import { actReAuthenticate, actUpdateEmail } from '../../database/action'
import { validateEmail } from '../../utils/helper'

export default function ChangeEmailForm({ email, setshowModal, toastRef, setReloadUser }) {
    const [newEmail, setnewEmail] = useState(email)
    const [pasword, setpasword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, seterrorPassword] = useState(null)
    const [showPassword, setshowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateFrom()) {
            return
        }
        
        setLoading(true)
        const resultReauthenticate = await actReAuthenticate(pasword)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            seterrorPassword("Contraseña incorrecta")
            return
        }        

        const resultUpdateEmail = await actUpdateEmail(newEmail)
        setLoading(false)

        if (!resultUpdateEmail.statusResponse) {
            setErrorEmail("Este email ya esta en uso por otro usuario")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se ha actualizado el Email", 3000)
        setshowModal(false)
    }

    const validateFrom = () => {
        setErrorEmail(null)
        seterrorPassword(null)
        let isValid = true

        if (!validateEmail(newEmail)) {
            setErrorEmail("El email no es valido.")
            isValid = false
        }

        if (newEmail === email) {
            setErrorEmail("El email no puede ser igual al actual.")
            isValid = false
        }

        if (isEmpty(pasword)) {
            seterrorPassword("La contraseña no puede estar vacia.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese su nuevo email..."
                containerStyle={styles.input}
                defaultValue={email}
                onChange={(event) => setnewEmail(event.nativeEvent.text)}
                errorMessage={errorEmail}
                keyboardType="email-address"
                rightIcon={{
                    type: 'material-community',
                    name: 'at',
                    color: 'grey',
                }}
            />
            <Input
                placeholder="Ingrese tu contraseña..."
                containerStyle={styles.input}
                defaultValue={pasword}
                onChange={(event) => setpasword(event.nativeEvent.text)}
                errorMessage={errorPassword}
                pasword={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={{ color: '#c2c2c2' }}
                        onPress={() => setshowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        width: '95%',
    },
    btn: {
        backgroundColor: '#442484',
    }
})
