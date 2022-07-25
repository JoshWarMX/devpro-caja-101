import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input, Icon, Avatar, Image, ListItem } from '@rneui/base'
import { map, size, filter, isEmpty, isNumber, toNumber, findIndex } from 'lodash'
import CountryPicker from 'react-native-country-picker-modal'


import { loadImageFromGallery } from '../../utils/helper'
import { actGetCurrentUser, actFindProductby, actUploadImage, actUpdateStock, actAddDocumentWithOuthId } from '../../database/action'
import uuidv4 from 'random-uuid-v4'
import { useFocusEffect } from '@react-navigation/native'

const widthScreen = Dimensions.get("window").width
const heightScreen = Dimensions.get("window").height

export default function AddProductOnSale({ toastRef, setLoading, navigation, codeCapture }) {
    const [formEnterData, setFormEnterData] = useState(defaultFormValues())
    const [errorReference, setErrorReference] = useState(null)
    const [imagesSelected, setimagesSelected] = useState([])
    const [addItem, setAddItem] = useState(defaultItemData())
    const [errorScanCode, setErrorScanCode] = useState(null)
    const [errorQuantity, setErrorQuantity] = useState(null)
    const [errorPrice, setErrorPrice] = useState(null)

    const addItemtoSale = async () => {

        if (!validItem()) {
            return
        }

        const findList = (findIndex(formEnterData.items, { 'scanCode': addItem.scanCode }))
        console.log(findList)
        if (findList !== -1) {
            //setErrorScanCode('El codigo de barras ya existe en la lista.')
            toastRef.current.show("El codigo de barras ya existe en la lista.", 2000)
            return
        }


        const existentScanCode = await actFindProductby("scanCode", addItem.scanCode)
        if (!existentScanCode.statusResponse) {
            setErrorScanCode("El codigo de barras no existe.")
            console.log(existentScanCode.statusResponse)
            return
        }
        console.log(existentScanCode)

        addItem.name = existentScanCode.product.name
        addItem.productId = existentScanCode.product.productId
        addItem.image = existentScanCode.product.images[0]

        formEnterData.items.push(addItem)
        console.log(addItem)
        setAddItem(defaultItemData())

    }

    const enterMerch = async () => {

        if (!validForm()) {
            return
        }

        const responseUploadImages = await uploadImages()
        const enterMerchData = {
            reference: formEnterData.reference,
            items: formEnterData.items,
            images: responseUploadImages,
            createdAt: new Date(),
            createBy: actGetCurrentUser().uid,
        }

        const resultAddOrder = await actAddDocumentWithOuthId('enterMerchOrders', enterMerchData)
        console.log(resultAddOrder)
        if (!resultAddOrder.statusResponse) {
            toastRef.current.show("Orden de Entrada Fallo.", 2000)
            return
        }

        setLoading(true)
        console.log(setLoading)

        formEnterData.items.forEach(element => {
            actUpdateStock(element.productId, element.quantity)
        });




        setLoading(false)
        console.log(setLoading)

        navigation.navigate("Store")
    }

    const validForm = () => {

        const inputStringValidation = (input, length) => {
            const response = { empty: null, short: null };
            response.empty = (isEmpty(input))
            response.short = (size(input) < length)
            return response
        }

        const inputNumberValidation = (input) => {
            const response = { empty: null, invalid: null };
            response.empty = ((input) <= 0)
            response.invalid = ((input) === NaN)
            return response
        }

        clearErrors()
        let valid = true

        const resReference = (inputStringValidation(formEnterData.reference, 6))
        if (resReference.empty) {
            setErrorReference("La referencia no puede estar vacio.")
            valid = false
        }
        if (!resReference.empty && resReference.short) {
            setErrorReference("La referencia debe tener al menos 6 caracteres.")
            valid = false
        }
        return valid
    }

    const validItem = () => {

        const inputStringValidation = (input, length) => {
            const response = { empty: null, short: null };
            response.empty = (isEmpty(input))
            response.short = (size(input) < length)
            return response
        }

        const inputNumberValidation = (input) => {
            const response = { empty: null, invalid: null };
            response.empty = ((input) <= 0)
            response.invalid = ((input) === NaN)
            return response
        }

        clearErrorsItem()
        let valid = true

        const resScanCode = (inputStringValidation(addItem.scanCode, 6))
        if (resScanCode.empty) {
            setErrorScanCode("La Codigo no puede estar vacio.")
            valid = false
        }
        if (!resScanCode.empty && resScanCode.short) {
            setErrorScanCode("La Codigo debe tener al menos 6 caracteres.")
            valid = false
        }

        const resQuantity = (inputNumberValidation(addItem.quantity, 6))
        if (resQuantity.empty) {
            setErrorQuantity("La Cantidad debe ser mayor a 0.")
            valid = false
        }

        const resPrice = (inputNumberValidation(addItem.price, 6))
        if (resPrice.empty) {
            setErrorPrice("El Precio debe ser mayor a 0.")
            valid = false
        }

        return valid
    }

    const clearErrors = () => {
        setErrorReference(null)
    }

    const clearErrorsItem = () => {
        setErrorScanCode(null)
        setErrorQuantity(null)
        setErrorPrice(null)
    }

    useFocusEffect(
        useCallback(() => {
            if (codeCapture && (addItem.scanCode !== codeCapture) && (codeCapture !== "f")) {
                setAddItem({ ...addItem, scanCode: codeCapture })
            }
        }, [codeCapture]))

    const sumall = formEnterData.items.map(item => item.quantity * item.price).reduce((prev, curr) => prev + curr, 0);


    return (
        <View>
            <ScrollView style={styles.viewContainer}>
                <FormAdd
                    formEnterData={formEnterData}
                    setFormEnterData={setFormEnterData}
                    errorReference={errorReference}
                    navigation={navigation}
                    setAddItem={setAddItem}
                    addItem={addItem}
                    errorScanCode={errorScanCode}
                    errorQuantity={errorQuantity}
                    setimagesSelected={setimagesSelected}
                    imagesSelected={imagesSelected}
                    addItemtoForm={addItemtoSale}
                    enterMerch={enterMerch}
                    errorPrice={errorPrice}
                />
                

            </ScrollView>
            <View style={styles.viewLoading}>
            <View style={{ alignItems: 'center' }}>
                    <Text style={styles.total}>Total de la Venta: $ {sumall}</Text>
                </View>
                <Button
                    title="Finalizar Venta"
                    onPress={enterMerch}
                    buttonStyle={styles.btnAdd}
                    titleStyle={styles.btnAddText}
                />
            </View>
        </View>
    )
}

function FormAdd({
    formEnterData, setFormEnterData, errorReference,
    addItem, setAddItem, errorScanCode, errorQuantity,
    addItemtoForm, navigation, errorPrice
}) {


    const onChangeT = (e, type) => {
        setFormEnterData({ ...formEnterData, [type]: e.nativeEvent.text })
    }

    const onChangeT2 = (e, type) => {
        setAddItem({ ...addItem, [type]: e.nativeEvent.text })
    }

    const onChangeN = (e, type) => {
        const receivedValue = e.nativeEvent.text
        setAddItem({ ...addItem, [type]: toNumber(e.nativeEvent.text) })
    }

    return (
        <View style={styles.viewForm}>
            <View style={styles.viewClient}>
                <Input
                    placeholder="Numero de Cliente"
                    containerStyle={styles.inputForm}
                />
                <Avatar
                    rounded
                    size="medium"
                    source={{
                        uri: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    }}
                />
            </View>
            <View style={styles.viewForm2}>
                <View style={styles.viewClient}>
                    <Input
                        placeholder="Codigo de Barras"
                        defaultValue={addItem.scanCode}
                        onChange={(e) => onChangeT2(e, "scanCode")}
                        errorMessage=""
                        keyboardType="numeric"
                        rightIcon={{
                            type: 'material-community',
                            name: 'barcode-scan',
                            color: 'grey',
                            onPress: () => navigation.navigate('BarcodeScan')
                        }}
                        containerStyle={styles.inputScanCode}
                    />
                    <Input
                        placeholder="Cantidad"
                        defaultValue={onChangeN.receivedValue}
                        onChange={(e) => onChangeN(e, "quantity")}
                        errorMessage=""
                        keyboardType="numeric"
                        rightIcon={{
                            type: 'material-community',
                            name: 'pound',
                            color: 'grey',
                            onPress: () => navigation.navigate('BarcodeScan')
                        }}
                        containerStyle={styles.inputQuantity}
                    />
                </View>
                <Button title="Agregar Item" buttonStyle={styles.btnAdd}
                    onPress={() => addItemtoForm()} />
            </View>

            {
                size(formEnterData.items) > 0 ? (
                    formEnterData.items.map((items, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar
                                source={{ uri: items.image }} rounded
                                size="large" />
                            <ListItem.Content>
                                <ListItem.Title>Cantidad: {items.quantity} piezas    Precio: {items.price} $</ListItem.Title>
                                <ListItem.Subtitle>{items.name}</ListItem.Subtitle>
                                <ListItem.Subtitle>cod. {items.scanCode}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))

                ) : (
                    <View style={styles.notFoundView} >
                        <Text style={styles.notFoundText} >Sin Productos Agregados</Text>
                    </View>
                )
            }

        </View>
    )

}

const defaultFormValues = () => {
    return {
        reference: "",
        date: "",
        items: [],
    }
}

const defaultItemData = () => {
    return {
        scanCode: "",
        name: "",
        quantity: "",
        price: "",
        image: "",
        productId: "",
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        width: '100%',
    },
    inputForm: {
        width: '80%',
    },
    viewClient: {
        flexDirection: 'row',
        marginBottom: 3,
        borderRadius: 10,
        backgroundColor: "lightgray",
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingRight: 5,
        paddingTop: 5,
    },
    viewForm: {
        marginHorizontal: 10,
    },
    inputScanCode: {
        width: '68%',
        renderErrorMessage: true,
    },
    inputQuantity: {
        width: '32%',
        renderErrorMessage: true,
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAdd: {
        backgroundColor: "#442484",
        borderRadius: 30,
        marginBottom: 10,
    },
    btnAddText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 22,
        textAlign: "center",
        padding: 10,
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        margin: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#a65273"
    },
    viewMapBtnSave: {
        backgroundColor: "#442484"
    },
    viewScanCode: {
        flexDirection: "column",
    },
    viewForm2: {
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "lightgray",
    },
    total: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        width: "80%",
        padding: 5,
        borderRadius: 30,
        color: "white",
        backgroundColor: "gray",
    }
})
