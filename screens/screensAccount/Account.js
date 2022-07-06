import { StyleSheet } from 'react-native'
import React, { useState, useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native'

import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import Loading from '../../components/Loading';
import { actGetCurrentUser, actIsUserLogged } from '../../database/action';

export default function Account() {
    const [login, setLogin] = useState(null)

    useFocusEffect(
        useCallback(() => {
            const user = actGetCurrentUser()
            user ? setLogin(true) : setLogin(false)            
        }, [])
    )


    if (login == null) {
        return <Loading isVisible={true} text="Cargando..." />
    }
    return login ? <UserLogged /> : <UserGuest />
}
//     return (
//         <UserGuest />
//     )
// }

const styles = StyleSheet.create({})