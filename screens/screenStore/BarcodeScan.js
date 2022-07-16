import comBarcode from '../../components/comBarcode'

export default function BarcodeScan({ navigation, route }) {
    return comBarcode(navigation, route, 'EnterMerch')
}

