import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react'
import { actGetCurrentUser, actGetProducts } from '../../database/action';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';


export default function Counter() {
    const navigation = useNavigation()
    const [login, setLogin] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    // const getProductsToLocalStorage = async () => {
    //     const products = await actGetProducts(1000)
    //     if (products.statusResponse) {
    //         await AsyncStorage.setItem('products', JSON.stringify(products.products))
    //     }
    //     return JSON.parse(JSON.stringify(products.products))
    // }

    // useFocusEffect(
    //     useCallback(() => {
    //         setLoading(true)            
    //         async function getPro() {
    //             const response = await actGetProducts(limitProducts)
    //             if (response.statusResponse) {
    //                 setStartProduct(response.startProduct)
    //                 setProducts(response.products)                    
    //             }
    //         }
    //         function getLog() {
    //             const user = actGetCurrentUser()
    //             user ? setLogin(true) : setLogin(false)
    //         }
    //         getLog()
    //         getPro()
    //         setLoading(false)

    //     }, [])
    // )

    useFocusEffect(
        useCallback(() => {
            //setLoading(true)
            async function getProductsToLocalStorage() {
                const response = await actGetProducts(1000)
                if (response.statusResponse) {
                    await AsyncStorage.setItem('products', JSON.stringify(response.products))
                    setProducts(response.products)
                }

            }
            function getLog() {
                const user = actGetCurrentUser()
                user ? setLogin(true) : setLogin(false)
            }
            getProductsToLocalStorage()
            getLog()
        }, [])
    )

    return (
        <View style={styles.buttonsContainer} >                          
                <Button buttonStyle={styles.btnContainer} titleStyle={styles.textStyle} title="Generar Venta"
                    icon={styles.iconNewSale}
                    iconPosition="right"
                    iconContainerStyle={styles.iconContainerStyle}
                    onPress={() => navigation.navigate('NewSale')}
                />
                <Button buttonStyle={styles.btnContainer} titleStyle={styles.textStyle} title="Generar Corte de Caja"
                    icon={styles.iconCut}
                    iconPosition="right"
                    iconContainerStyle={styles.iconContainerStyle}
                />
                <Button buttonStyle={styles.btnContainer} titleStyle={styles.textStyle} title="Generar Devoluciones"
                    icon={styles.iconDevolution}
                    iconPosition="right"
                    iconContainerStyle={styles.iconContainerStyle}                    
                />            
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    
      },
    btnContainer: {
        backgroundColor: '#442484',
        borderRadius: 10,
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    iconNewSale: {
        name: 'cash-register',
        type: 'material-community',
        size: 40,
        color: 'white',
    },
    iconCut: {
        name: 'cash-check',
        type: 'material-community',
        size: 40,
        color: 'white',
    },
    iconDevolution: {
        name: 'cash-refund',
        type: 'material-community',
        size: 40,
        color: 'white',
    },
    iconContainerStyle: {
        position: 'absolute',
        right: 0,
        margin: 10,
    }
})