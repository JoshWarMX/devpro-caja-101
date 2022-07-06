import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@rneui/base'
import { isEmpty } from 'lodash'

import { actUpdateProfile } from '../../database/action'


export default function ChangeDisplayNameForm({ displayName, setshowModal, toastRef, setReloadUser }) {
    const [newDisplayName, setnewDisplayName] = useState(displayName)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateFrom()){
            return
        }

        setLoading(true)
        const result = await actUpdateProfile({ displayName: newDisplayName })
        setLoading(false)

        if (!result.statusResponse) {
            setError("Error al actualizar el nombre")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Nombre actualizado correctamente", 3000)
        setshowModal(false)
    }

    const validateFrom = () => {
        setError(null)
        
        if(isEmpty(newDisplayName)){
            setError("El nombre no puede estar vacio.")
            return false
        }

        if(newDisplayName === displayName ){
            setError("El nombre no puede ser igual al actual.")
            return false
        }

        return true
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingrese su nuevo nombre"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(event) => setnewDisplayName(event.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: 'material-community',
                    name: 'account-circle-outline',
                    color: 'grey',
                }}
            />
            <Button
                title="Cambiar Nombre"
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