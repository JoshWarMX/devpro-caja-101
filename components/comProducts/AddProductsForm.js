import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@rneui/base'
import CountryPicker from 'react-native-country-picker-modal'



export default function AddProductsForm({ toastRef, setLoading, navigation }) {
  const addProduct = () => {
    console.log('Producto Agregado');
  }

  return (
    <ScrollView style={styles.viewContainer}>
      <FormAdd />
      <Button
        title="Crear Producto"
        onPress={addProduct}
        buttoStyle={styles.btnAdd}
      />
    </ScrollView>
  )
}



function FormAdd() {
  const [country, setCountry] = useState("CO")
  const [callinCode, setCallinCode] = useState("57")
  const [phoneNumber, setPhoneNumber] = useState("")


  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Titulo"
      />
      <Input
        placeholder="Nombre del Producto"
      />
      <Input
        placeholder="Marca"
      />
      <Input
        placeholder="Linea de Producto"
      />
      <Input
        placeholder="Tipo de Producto"
      />
      <Input
        placeholder="Descripcion"
        multiline
        containerStyle={styles.textArea}
      />
      <Input
        placeholder="Precio"
      />
      <Input
        placeholder="Impuesto"
      />
      <View style={styles.phoneView}>
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
      </View>      
    </View>
  )

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
  btnAddRestaurant: {
    margin: 20,
    backgroundColor: "#442484"
  },
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30
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
  }

})