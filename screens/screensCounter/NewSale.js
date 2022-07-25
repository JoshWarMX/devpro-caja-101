import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '@rneui/base'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actGetCurrentUser } from '../../database/action';
import AddProductOnSale from '../../components/comNewSale.js/AddProductOnSale';
import Toast from 'react-native-easy-toast'


export default function NewSale( { navigation, route } ) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    const [products, setProducts] = useState({})
    const [value, setValue] = useState('')
    const [suggestionSelected, setSuggestionSelected] = useState({})
    const [login, setLogin] = useState(null)

    useFocusEffect(
        useCallback(() => {
            async function getProductsToLocalStorage() {
                const response = await AsyncStorage.getItem('products')
                if (response) {
                    setProducts(JSON.parse(response))
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
    
    const objetKeyToArray = (object, keyn) => {   
        return Object.keys(object).map(key => object[key][keyn].toLowerCase())
    } 

    

    const extractNameProduct = objetKeyToArray(products, 'name')
    //const [dataSource] = useState(['apple', 'banana', 'cow', 'dex', 'zee', 'orange', 'air', 'bottle'])
    const [dataSource] = useState(extractNameProduct)
    const [colors] = useState(['#84DCC6', '#FEC8C8', '#F7E4CF', "#E8DEF3",])
      
    const [filtered, setFiltered] = useState(extractNameProduct)
    const [searching, setSearching] = useState(false)
    const onSearch = (text) => {
        if (text) {
            setSearching(true)
            const temp = text.toLowerCase()

            const tempList = extractNameProduct.filter(item => {
                if (item.match(temp))
                    return item
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(extractNameProduct)
        }

    }
    const randomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)]
    }
    return (
        <View style={styles.container} >
          <AddProductOnSale
          toastRef={toastRef}
          setLoading={setLoading}
          navigation={navigation}
          codeCapture={route.params?.codeCapture}
          route={route}
          />
        </View >
    )
}


const styles = StyleSheet.create({
    container: {       
        alignItems: 'center',
        marginTop: '2%',
        flex: 1
    },
    textInput: {
        backgroundColor: '#BFBFBF',
        width: '80%',
        borderRadius: 5,
        height: 50,
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
});
