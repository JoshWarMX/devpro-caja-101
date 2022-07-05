import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { map } from 'lodash'
import { Icon, ListItem } from '@rneui/base'

export default function AccountOptions({ user, toastRef }) {
    const menuOptions = generateOptions()
    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <ListItem

                        >
                            <Icon
                                type='material-community'
                                name={menu.iconNameLeft}
                                color={menu.iconColorLeft}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{menu.title}</ListItem.Title>
                            </ListItem.Content>
                            <Icon
                                type='material-community'
                                name={menu.iconNameRight}
                                color={menu.iconColorRight}
                            />

                        </ListItem>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const generateOptions = () => {

    const selectedComponent = (key) => {
        console.log(key)
    }

    return [
        {
            title: 'Cambiar Nombre',
            iconNameLeft: 'account-circle',
            iconColorLeft: '#a7bfd3',
            iconNameRight: 'chevron-right',
            iconColorRight: '#a7bfd3',
            onPress: () => selectedComponent('Cambiar Nombre')
        },
        {
            title: 'Cambiar Email',
            iconNameLeft: 'at',
            iconColorLeft: '#a7bfd3',
            iconNameRight: 'chevron-right',
            iconColorRight: '#a7bfd3',
            onPress: () => selectedComponent('Cambiar Email')
        },
        {
            title: 'Cambiar Contraseña',
            iconNameLeft: 'lock',
            iconColorLeft: '#a7bfd3',
            iconNameRight: 'chevron-right',
            iconColorRight: '#a7bfd3',
            onPress: () => selectedComponent('Cambiar Contraseña')
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    }

})
