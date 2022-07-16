import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Toast from 'react-native-easy-toast'

import EnterMerchForm from '../../components/comStore/EnterMerchForm'
import Loading from '../../components/Loading'

export default function EnterMerch({ navigation, route }) {
  const toastRef = useRef()
  const [loading, setLoading] = useState(false)
  return (
    <View>
      <EnterMerchForm
        toastRef={toastRef}
        setLoading={setLoading}
        navigation={navigation}
        codeCapture={route.params?.codeCapture}
        route={route}
      />
      <Loading isVisible={loading} text="Cargando Orden..." />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  )
}

const styles = StyleSheet.create({})