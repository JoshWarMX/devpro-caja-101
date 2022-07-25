import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'



export default function Store() {
  const navigation = useNavigation()
  return (
    <View style={styles.buttonsContainer} >
      <Button buttonStyle={styles.btnContainer} titleStyle={styles.textStyle} title="Buscar Producto"
        icon={styles.iconFindProduct}
        iconPosition="right"
        iconContainerStyle={styles.iconContainerStyle}

      />
      <Button buttonStyle={styles.btnContainer} titleStyle={styles.textStyle} title="Hacer Inventario"
        icon={styles.iconMakeInventory}
        iconPosition="right"
        iconContainerStyle={styles.iconContainerStyle}
      />
      <Button buttonStyle={styles.btnContainer} titleStyle={styles.textStyle} title="Ingresos de Mercancia"
        icon={styles.iconEnterMerch}
        iconPosition="right"
        iconContainerStyle={styles.iconContainerStyle}
        onPress={() => navigation.navigate('OrdersEnterMerch')}
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
  iconFindProduct: {
    name: 'store-search',
    type: 'material-community',
    size: 40,
    color: 'white',
  },
  iconMakeInventory: {
    name: 'store-edit',
    type: 'material-community',
    size: 40,
    color: 'white',
  },
  iconEnterMerch: {
    name: 'store-plus',
    type: 'material-community',
    size: 40,
    color: 'white',
  },
  iconContainerStyle: {
    position: 'absolute',
    right: 5,
    margin: 10,
  }
})