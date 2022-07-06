import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Icon } from '@rneui/base'

import { actGetCurrentUser } from '../../database/action'
import Loading from '../../components/Loading'
import { TabRouter } from '@react-navigation/native'


export default function Products({ navigation }) {
    const [login, setLogin] = useState(null)

    useFocusEffect(
        useCallback(() => {
            const user = actGetCurrentUser()
            user ? setLogin(true) : setLogin(false)                      
        }, [])
    )


    if (login == null) {
        return <Loading isVisible={true} text="Cargando..." />
    }
   
    return (
        <View style={styles.viewBody}>
            <Text onPress={() => { console.log(user); }}>Products...</Text>
            {
                login && (
                    <Icon
                        type='material-community'
                        name='plus'
                        color='#442484'
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate('AddProducts')}
                        />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
    btnContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    }

})