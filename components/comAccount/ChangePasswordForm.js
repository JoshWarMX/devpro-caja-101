import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, Input } from '@rneui/base'
import { isEmpty, size } from 'lodash'

import { actReAuthenticate, actUpdatePassword } from '../../database/action'


export default function ChangePasswordForm({ setshowModal, toastRef }) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setshowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateFrom()) {
            return
        }

        setLoading(true)
        const resultReauthenticate = await actReAuthenticate(currentPassword)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta")
            return
        }        

        const resultUpdateEmail = await actUpdatePassword(newPassword)
        setLoading(false)

        if (!resultUpdateEmail.statusResponse) {
            setErrorNewPassword("Hubo un error al actualizar la contraseña")
            return
        }

        toastRef.current.show("Se ha actualizado la Contraseña", 3000)
        setshowModal(false)
    }

    const validateFrom = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true
 
        const isEmptyCurrentPass = (isEmpty(currentPassword))
        const isShortCurrentPass = (size(currentPassword) < 6)        
        const isEmptyNewPass = (isEmpty(newPassword))
        const isShortNewPass = (size(newPassword) < 6)
        const isEmptyConfirmPass = (isEmpty(confirmPassword))
        const isShortConfirmPass = (size(confirmPassword) < 6)

        if (isEmptyCurrentPass && isShortCurrentPass) {
            console.log(isEmptyCurrentPass, isShortCurrentPass)
            setErrorCurrentPassword("La contraseña Actual no puede estar vacia.")
            isValid = false
        }

        if (isEmptyNewPass && isShortNewPass) {
            setErrorNewPassword("La Nueva contraseña no puede estar vacia.")
            isValid = false
        }

        if (isEmptyConfirmPass && isShortConfirmPass) {
            setErrorConfirmPassword("La Confirmación de contraseña no puede estar vacia.")
            isValid = false
        }   

        if (isShortCurrentPass) {
            setErrorCurrentPassword("La Contraseña debe al menos tener 6 caracteres.")
            isValid = false
        }

        if (isShortNewPass) {
            setErrorNewPassword("La Nueva Contraseña debe al menos tener 6 caracteres.")
            isValid = false
        }

        if (isShortConfirmPass) {
            setErrorConfirmPassword("La Confirmacion Contraseña debe al menos tener 6 caracteres.")
            isValid = false
        }

        if (newPassword !== confirmPassword) {
            setErrorNewPassword("Las Nueva contraseñas y confirmacion no coinciden.")
            setErrorConfirmPassword("Las Nueva contraseñas y confirmacion no coinciden.")
            isValid = false
        }

        if (newPassword === currentPassword) {
            setErrorCurrentPassword("La contraseña no puede ser igual a la actual.")
            setErrorNewPassword("La contraseña no puede ser igual a la actual.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese tu contraseña Actual..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(event) => setCurrentPassword(event.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
            <Input
                placeholder="Ingrese tu Nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(event) => setNewPassword(event.nativeEvent.text)}
                errorMessage={errorNewPassword}
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
            <Input
                placeholder="Confirma tu nueva contraseña..."
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(event) => setConfirmPassword(event.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
