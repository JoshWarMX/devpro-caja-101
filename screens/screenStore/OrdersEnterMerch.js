import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { color, Icon } from '@rneui/base'
import { size } from 'lodash'

import { actGetCurrentUser, actGetEnterOrders } from '../../database/action'
import Loading from '../../components/Loading'
import ListOrderEnterMerch from '../../components/comStore/ListOrderEnterMerch'

export default function OrdersEnterMerch({ navigation, route }) {

    const [login, setLogin] = useState(null)
    const [startOrder, setStartOrder] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)


    const limitOrders = 10

    useFocusEffect(
        useCallback(() => {
            setLoading(true)            
            async function getPro() {
                const response = await actGetEnterOrders(limitOrders)
                
                if (response.statusResponse) {
                    setStartOrder(response.startOrder)
                    setOrders(response.orders)                    
                }
            }
            function getLog() {
                const user = actGetCurrentUser()
                user ? setLogin(true) : setLogin(false)
            }
            getLog()
            getPro()            
            setLoading(false)
            
            
        }, [])
    )

    if (login == null) {
        return <Loading isVisible={loading} text="Cargando..." />
    }

    return (        
        <View style={styles.viewBody}>
            <Text style={styles.title}>Ordenes de entrada Generadas</Text>
            {
                size(orders) > 0 ?(
                    <ListOrderEnterMerch
                        orders={orders}
                        navigation={navigation}
                    />
                ) :(
                    <View style={styles.notFoundView} >
                        <Text style={styles.notFoundText} >No hay Ordenes Registradas</Text>
                    </View>
                )
            }            
            {
                login && (
                    <Icon
                        type='material-community'
                        name='plus'
                        color='#442484'
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate('EnterMerch')}
                    />
                )
            }
            <Loading isVisible={loading} text="Cargando..." />
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10,
        color: "#442484",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: 10,

    }

})