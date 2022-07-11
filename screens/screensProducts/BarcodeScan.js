import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Button } from '@rneui/base'

export default function BarcodeScan({ navigation, route }) {
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const [barcode, setBarcode] = useState('No hay codigo')

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }

    // Request permission to use the camera
    useEffect(() => {
        askForCameraPermission()
    }, [])

    // What happens when the user presses the scan button
    const handleBarcodeScanned = ({ type, data }) => {
        setScanned(true)
        setBarcode(data)
        console.log('Barcode scanned', type, data)
    }

    // Check permission to use the camera
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button title="Allow Camera" onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <View style={styles.BarcodeScanner}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
                    style={{ width: '100%', height: '100%' }} />
            </View>
            <Text style={styles.maintext} >{barcode}</Text>
            <View style={styles.btncontainer}>
                {scanned && <Button
                    title="Escanear Nuevamente"
                    onPress={() => setScanned(false)}
                    buttonStyle={styles.btn}
                    titleStyle= {styles.txtStyle}/>}
                {scanned && <Button
                    title="Aceptar Codigo"
                    onPress={() => {
                        navigation.navigate({
                            name: 'AddProducts',
                            params: { codeCapture: barcode },
                            merge: true,
                        })
                    }}
                    buttonStyle={styles.btn} 
                    titleStyle= {styles.txtStyle}/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    BarcodeScanner: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '90%',
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'black',
    },
    maintext: {
        fontSize: 20,
        margin: 10,
        color: '#442484',
    },
    btn: {
        margin: 2,
        backgroundColor: '#442484',
        borderRadius: 30,
    },
    btncontainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 10,        
    },
    txtStyle: {
        fontSize: 20,
        color: 'white',
        margin: 10,
    }
})