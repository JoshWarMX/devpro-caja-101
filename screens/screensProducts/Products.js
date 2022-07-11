import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { Icon } from '@rneui/base'
import { size } from 'lodash'

import { actGetCurrentUser, actGetProducts } from '../../database/action'
import Loading from '../../components/Loading'
import ListProducts from '../../components/comProducts/ListProducts'
import { avatarSizes } from '@rneui/base/dist/Avatar/Avatar'

export default function Products({ navigation, route }) {

    const [login, setLogin] = useState(null)
    const [startProduct, setStartProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    const limitProducts = 10

    useFocusEffect(
        useCallback(() => {
            setLoading(true)            
            async function getPro() {
                const response = await actGetProducts(limitProducts)
                if (response.statusResponse) {
                    setStartProduct(response.startProduct)
                    setProducts(response.products)
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
            {
                size(products) > 0 ?(
                    <ListProducts
                        products={products}
                        navigation={navigation}
                    />
                ) :(
                    <View style={styles.notFoundView} >
                        <Text style={styles.notFoundText} >No hay productos</Text>
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
                        onPress={() => navigation.navigate('AddProducts')}
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
    }
})