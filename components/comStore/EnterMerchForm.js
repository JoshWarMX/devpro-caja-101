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

export default function EnterMerchForm({ toastRef, setLoading, navigation, codeCapture }) {
    const [formEnterData, setFormEnterData] = useState(defaultFormValues())
    const [errorReference, setErrorReference] = useState(null)
    const [errorDate, setErrorDate] = useState(null)
    const [imagesSelected, setimagesSelected] = useState([])
    const [addItem, setAddItem] = useState(defaultItemData())
    const [errorScanCode, setErrorScanCode] = useState(null)
    const [errorQuantity, setErrorQuantity] = useState(null)

    const addItemtoForm = async () => {  
        
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
        const enterMerchaData = {
            reference: formEnterData.reference,
            date: formEnterData.date,
            items: formEnterData.items,          
            images: responseUploadImages,
            createdAt: new Date(),
            createBy: actGetCurrentUser().uid,
        }

        const resultAddOrder = await actAddDocumentWithOuthId('enterMerchaOrders', enterMerchaData)
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

    const uploadImages = async () => {
        const imageUrl = []
        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await actUploadImage(image, "products", uuidv4())
                if (response.statusResponse) {
                    imageUrl.push(response.url)
                }
            })
        )
        return imageUrl
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

        const resName = (inputStringValidation(formEnterData.date, 6))
        if (resName.empty) {
            setErrorDate("La fecha no puede estar vacia.")
            valid = false
        }
        if (!resName.empty && resName.short) {
            setErrorDate("La fecha debe tener al menos 6 caracteres.")
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

        return valid
    }

    const clearErrors = () => {
        setErrorReference(null)
        setErrorDate(null)
    }

    const clearErrorsItem = () => {
        setErrorScanCode(null)
        setErrorQuantity(null)
    }

    useFocusEffect(
        useCallback(() => {
            if (codeCapture && (addItem.scanCode !== codeCapture) && (codeCapture !== "f")) {
                setAddItem({ ...addItem, scanCode: codeCapture })
            }
        }, [codeCapture]))


    return (
        <ScrollView style={styles.viewContainer}>
            <ImageReference
                imagesProduct={imagesSelected[0]}
            />
            <FormAdd
                formEnterData={formEnterData}
                setFormEnterData={setFormEnterData}
                errorReference={errorReference}
                errorDate={errorDate}
                navigation={navigation}
                setAddItem={setAddItem}
                addItem={addItem}
                errorScanCode={errorScanCode}
                errorQuantity={errorQuantity}
                setimagesSelected={setimagesSelected}
                imagesSelected={imagesSelected}
                addItemtoForm={addItemtoForm}
                enterMerch={enterMerch}
            />
            <UploadImageReference
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setimagesSelected={setimagesSelected}
                navigation={navigation}
            />
            <Button
                title="Ingresar Mercancia"
                onPress={enterMerch}
                buttonStyle={styles.btnAdd}
                titleStyle={styles.btnAddText}
            />
        </ScrollView>
    )
}

function ImageReference({ imagesProduct }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imagesProduct
                        ? { uri: imagesProduct }
                        : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}

function UploadImageReference({ toastRef, imagesSelected, setimagesSelected, navigation }) {

    const imagesSelect = async () => {
        const response = await loadImageFromGallery([1, 1])
        if (!response.status) {
            toastRef.current.show("No has Seleccionado Imagen.", 2000)
            return
        }
        setimagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro de eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Si",

                    onPress: () => {
                        setimagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: false
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            <Icon
                type='material-community'
                name='camera'
                color='#7a7a7a'
                containerStyle={styles.containerIcon}
                onPress={() => navigation.navigate('TakePhoto')}
            />
            {
                size(imagesSelected) < 2 && (
                    <Icon
                        type='material-community'
                        name='camera-burst'
                        color='#7a7a7a'
                        containerStyle={styles.containerIcon}
                        onPress={imagesSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imagesProduct, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imagesProduct }}
                        onPress={() => removeImage(imagesProduct)}
                    />
                ))
            }
        </ScrollView>
    )
}

function FormAdd({
    formEnterData, setFormEnterData, errorReference,
    errorDate, addItem, setAddItem, errorScanCode, errorQuantity,
    addItemtoForm, navigation
}) {


    const onChangeT = (e, type) => {
        setFormEnterData({ ...formEnterData, [type]: e.nativeEvent.text })
    }

    const onChangeT2 = (e, type) => {
        setAddItem({ ...addItem, [type]: e.nativeEvent.text })
    }

    const onChangeN = (e, type) => {
        const receivedValue = e.nativeEvent.text
        setEnterFormData({ ...formEnterData, [type]: toNumber(e.nativeEvent.text) })
    }


    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Referencia"
                defaultValue={formEnterData.reference}
                onChange={(e) => onChangeT(e, "reference")}
                errorMessage={errorReference}

            />
            <Input
                placeholder="Fecha"
                defaultValue={formEnterData.date}
                onChange={(e) => onChangeT(e, "date")}
                errorMessage={errorDate}
                keyboardType="numeric"
            />
            <View style={styles.viewForm2}>
                <Input
                    placeholder="Codigo de Barras"
                    defaultValue={addItem.scanCode}
                    onChange={(e) => onChangeT2(e, "scanCode")}
                    errorMessage={errorScanCode}
                    keyboardType="numeric"
                    rightIcon={{
                        type: 'material-community',
                        name: 'barcode-scan',
                        color: 'grey',
                        onPress: () => navigation.navigate('BarcodeScan')
                    }}
                />
                <Input
                    placeholder="Cantidad"
                    defaultValue={addItem.quantity}
                    onChange={(e) => onChangeT2(e, "quantity")}
                    errorMessage={errorQuantity}
                    keyboardType="numeric"
                    rightIcon={{
                        type: 'material-community',
                        name: 'pound',
                        color: 'grey',
                        onPress: () => navigation.navigate('BarcodeScan')
                    }}
                />
                <Button title="Agregar Item" buttonStyle={styles.btnAdd}
                    onPress={() => addItemtoForm()} />

                <Button title="Prueba Stock" buttonStyle={styles.btnAdd}
                    onPress={() => actUpdateStock("EqFO7CF1gYvy40GJ2w4j", 10)} />
            </View>
            {
                formEnterData.items.map((items, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar
                            source={{ uri: items.image }} rounded
                            size="large" />
                        <ListItem.Content>
                            <ListItem.Title>{items.quantity} piezas</ListItem.Title>
                            <ListItem.Subtitle>{items.name}</ListItem.Subtitle>
                            <ListItem.Subtitle>{items.scanCode}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
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
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10,
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
        margin: 5,
        backgroundColor: "#442484",
        borderRadius: 30,
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
    }

})
