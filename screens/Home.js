import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading';

export default function Home() {

    const navigation = useNavigation()
    const [go, setgo] = useState(false);

    setTimeout(() => {
        navigation.navigate('stackaccount')       
    }, 2000);

  return (
    <Loading isVisible={true} text="Cerrando..." />      
  ) 
} 
