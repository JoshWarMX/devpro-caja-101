import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input, Icon, Avatar, Image } from '@rneui/base'
import { map, size, filter, isEmpty, isNumber, toNumber } from 'lodash'
import CountryPicker from 'react-native-country-picker-modal'

import { loadImageFromGallery } from '../../utils/helper'
import { actAddDocumentWithOuthId, actGetCurrentUser, actFindProductby, actUploadImage } from '../../database/action'
import uuidv4 from 'random-uuid-v4'
import { useFocusEffect } from '@react-navigation/native'

const widthScreen = Dimensions.get("window").width
const heightScreen = Dimensions.get("window").height

export default function AddProductsForm({ toastRef, setLoading, navigation, codeCapture }) {
  const [formData, setFormData] = useState(defaultFormValues())
  const [erroTitle, setErroTitle] = useState(null)
  const [erroName, setErroName] = useState(null)
  const [erroBrand, setErroBrand] = useState(null)
  const [erroLine, setErroLine] = useState(null)
  const [erroType, setErroType] = useState(null)
  const [erroDescription, setErroDescription] = useState(null)
  const [erroPrice, setErroPrice] = useState(null)
  const [erroTax, setErroTax] = useState(null)
  const [errorScanCode, setErrorScanCode] = useState(null)
  const [imagesSelected, setimagesSelected] = useState([])
 
  const addProduct = async () => {

    if (!validForm()) {
      return
    }
    
    const existentName = await actFindProductby("name",formData.name)
    if (existentName.statusResponse) {
      setErroName("Ya hay un producto con este nombre.")      
      return
    } 

    const existentScanCode = await actFindProductby("scanCode",formData.scancode)
    if (existentScanCode.statusResponse) {
      setErrorScanCode("Ya hay un producto con este codigo de barras.")      
      return
    } 

    setLoading(true)
    const responseUploadImages = await uploadImages()
    const productData = {
      title: formData.title,
      name: formData.name,
      brand: formData.brand,
      line: formData.line,
      type: formData.type,
      description: formData.description,
      price: formData.price,
      tax: formData.tax,
      scanCode: formData.scancode,
      images: responseUploadImages,
      createdAt: new Date(),
      updatedAt: new Date(),
      createBy: actGetCurrentUser().uid,
      stock: [0, 0, 0, 0],
    }

    const responseAddDocument = await actAddDocumentWithOuthId('products', productData)
    setLoading(false)

    if (!responseAddDocument.statusResponse) {
      toastRef.current.show("Error al agregar el producto.", 2000)
      return
    }

    navigation.navigate("Products")
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

    const resTitle = (inputStringValidation(formData.title, 6))
    if (resTitle.empty) {
      setErroTitle("El titulo no puede estar vacio.")
      valid = false
    }
    if (!resTitle.empty && resTitle.short) {
      setErroTitle("El titulo debe tener al menos 6 caracteres.")
      valid = false
    }

    const resName = (inputStringValidation(formData.name, 6))
    if (resName.empty) {
      setErroName("El nombre no puede estar vacio.")
      valid = false
    }
    if (!resName.empty && resName.short) {
      setErroName("El nombre debe tener al menos 6 caracteres.")
      valid = false
    }
  

    const resBrand = (inputStringValidation(formData.brand, 2))
    if (resBrand.empty) {
      setErroBrand("La marca no puede estar vacia.")
      valid = false
    }
    if (!resBrand.empty && resBrand.short) {
      setErroBrand("La marca debe tener al menos 2 caracteres.")
      valid = false
    }

    const resLine = (inputStringValidation(formData.line, 6))
    if (resLine.empty) {
      setErroLine("La linea no puede estar vacia.")
      valid = false
    }
    if (!resLine.empty && resLine.short) {
      setErroLine("La linea debe tener al menos 6 caracteres.")
      valid = false
    }

    const resType = (inputStringValidation(formData.type, 6))
    if (resType.empty) {
      setErroType("El tipo no puede estar vacio.")
      valid = false
    }
    if (!resType.empty && resType.short) {
      setErroType("El tipo debe tener al menos 6 caracteres.")
      valid = false
    }

    const resDescription = (inputStringValidation(formData.description, 15))
    if (resDescription.empty) {
      setErroDescription("La descripcion no puede estar vacia.")
      valid = false
    }
    if (!resDescription.empty && resDescription.short) {
      setErroDescription("La descripcion debe tener al menos 15 caracteres.")
      valid = false
    }

    const resPrice = (inputNumberValidation(formData.price))
    if (resPrice.empty) {
      setErroPrice("El precio no puede ser 0.")
      valid = false
    }
    if (!resPrice.empty && resPrice.invalid) {
      setErroPrice("El precio es invalido.")
      valid = false
    }


    const resTax = (inputNumberValidation(formData.tax))
    if (resTax.empty) {
      setErroTax("El impuesto no puede ser 0.")
      valid = false
    }
    if (!resTax.empty && resTax.invalid) {
      setErroTax("El impuesto es invalido.")
      valid = false
    }

    const resScanCode = (inputStringValidation(formData.scancode, 6))
    if (resScanCode.empty) {
      setErrorScanCode("El codigo de barras no puede estar vacio.")
      valid = false
    }
    if (!resScanCode.empty && resScanCode.short) {
      setErrorScanCode("El codigo de barras debe ser de al menos 6 caracteres.")
      valid = false
    }
   
    return valid
  }

  const clearErrors = () => {
    setErroTitle(null)
    setErroName(null)
    setErroBrand(null)
    setErroLine(null)
    setErroType(null)
    setErroDescription(null)
    setErroPrice(null)
    setErroTax(null)
    setErrorScanCode(null)
  }

  useFocusEffect(
    useCallback(() => {         
      if (codeCapture && (formData.scancode !== codeCapture) && (codeCapture !== "f")) {
      setFormData({ ...formData, scancode: codeCapture })
    }
    }, [codeCapture]))


  return (
    <ScrollView style={styles.viewContainer}>
      <ImageProduct
        imagesProduct={imagesSelected[0]}
      />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        erroTitle={erroTitle}
        setErroTitle={setErroTitle}
        erroName={erroName}
        erroBrand={erroBrand}
        erroLine={erroLine}
        erroType={erroType}
        erroDescription={erroDescription}
        erroPrice={erroPrice}
        erroTax={erroTax}
        errorScanCode={errorScanCode}
        navigation={navigation}
      />
      <UploadImageProducts
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setimagesSelected={setimagesSelected}
      />
      <Button
        title="Crear Producto"
        onPress={addProduct}
        buttonStyle={styles.btnAdd}
        titleStyle={styles.btnAddText}
      />
    </ScrollView>
  )
}

function ImageProduct({ imagesProduct }) {
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

function UploadImageProducts({ toastRef, imagesSelected, setimagesSelected }) {

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
      {
        size(imagesSelected) < 2 && (
          <Icon
            type='material-community'
            name='camera'
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
  formData, setFormData, erroTitle,
  erroName, erroBrand, erroLine,
  erroType, erroDescription, erroPrice,
  erroTax, errorScanCode, navigation
}) {
  const [country, setCountry] = useState("CO")
  const [callinCode, setCallinCode] = useState("57")
  const [phoneNumber, setPhoneNumber] = useState("")

  const onChangeT = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  const onChangeN = (e, type) => {
    const receivedValue = e.nativeEvent.text
    setFormData({ ...formData, [type]: toNumber(e.nativeEvent.text) })
  }


  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Titulo"
        defaultValue={formData.title}
        onChange={(e) => onChangeT(e, "title")}
        errorMessage={erroTitle}
      />
      <Input
        placeholder="Nombre del Producto"
        defaultValue={formData.name}
        onChange={(e) => onChangeT(e, "name")}
        errorMessage={erroName}
      />
      <Input
        placeholder="Marca"
        defaultValue={formData.brand}
        onChange={(e) => onChangeT(e, "brand")}
        errorMessage={erroBrand}
      />
      <Input
        placeholder="Linea de Producto"
        defaultValue={formData.line}
        onChange={(e) => onChangeT(e, "line")}
        errorMessage={erroLine}
      />
      <Input
        placeholder="Tipo de Producto"
        defaultValue={formData.type}
        onChange={(e) => onChangeT(e, "type")}
        errorMessage={erroType}
      />
      <Input
        placeholder="Descripcion"
        multiline
        containerStyle={styles.textArea}
        defaultValue={formData.description}
        onChange={(e) => onChangeT(e, "description")}
        errorMessage={erroDescription}
      />
      <Input
        rightIcon={{
          type: 'material-community',
          name: 'currency-usd',
          color: 'grey',
        }}
        placeholder="Precio"
        defaultValue={onChangeN.receivedValue}
        keyboardType="decimal-pad"
        onChange={(e) => onChangeN(e, "price")}
        errorMessage={erroPrice}
      />
      <Input
        rightIcon={{
          type: 'material-community',
          name: 'percent',
          color: 'grey',
        }}
        placeholder="Porcentage de Impuesto"
        defaultValue={onChangeN.receivedValue}
        keyboardType="decimal-pad"
        onChange={(e) => onChangeN(e, "tax")}
        errorMessage={erroTax}
      />
      <View style={styles.viewScanCode}>
        <Input
          rightIcon={{
            type: 'material-community',
            name: 'barcode-scan',
            color: 'grey',
            onPress: () => navigation.navigate('BarcodeScan')
          }}
          placeholder="Scan Code"
          keyboardType='numeric'
          containerStyle={styles.scancode}
          defaultValue={formData.scancode}
          onChange={(e) => onChangeT(e, "scancode")}
          errorMessage={errorScanCode}
        />
        {/* <Button
          title="Scan Code"
          onPress={() => navigation.navigate('BarcodeScan')}
          icon={{
            type: 'material-community',
            name: 'barcode-scan',
            color: 'grey',
          }}
        /> */}
      </View>
      {/* <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStile={styles.countryPicker}
          countryCode={country}
          onSelect={(country) => {
            setCountry(country.cca2)
            setCallinCode(country.callingCode[0])
          }}
        />
        <Input
          placeholder="Telefono"
          keyboardType='phone-pad'
          containerStyle={styles.inputPhone}
        /> 
      </View> */}
    </View>
  )

}

const defaultFormValues = () => {
  return {
    title: "",
    name: "",
    brand: "",
    line: "",
    type: "",
    description: "",
    price: "",
    tax: "",
    scancode: "",
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
    margin: 20,
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
  }

})

