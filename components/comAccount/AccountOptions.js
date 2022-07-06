import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { map } from 'lodash'
import { Icon, ListItem } from '@rneui/base'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'

export default function AccountOptions({ user, toastRef, setReloadUser }) {
    const [showModal, setshowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const generateOptions = () => {
        return [
            {
                title: 'Cambiar Nombre',
                iconNameLeft: 'account-circle',
                iconColorLeft: '#a7bfd3',
                iconNameRight: 'chevron-right',
                iconColorRight: '#a7bfd3',
                onPress: () => selectedComponent('displayName')
            },
            {
                title: 'Cambiar Email',
                iconNameLeft: 'at',
                iconColorLeft: '#a7bfd3',
                iconNameRight: 'chevron-right',
                iconColorRight: '#a7bfd3',
                onPress: () => selectedComponent('email')
            },
            {
                title: 'Cambiar Contraseña',
                iconNameLeft: 'lock',
                iconColorLeft: '#a7bfd3',
                iconNameRight: 'chevron-right',
                iconColorRight: '#a7bfd3',
                onPress: () => selectedComponent('password')
            }
        ]
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                    displayName={user.displayName}
                    setshowModal={setshowModal}
                    toastRef={toastRef}
                    setReloadUser={setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                    email={user.email}
                    setshowModal={setshowModal}
                    toastRef={toastRef}
                    setReloadUser={setReloadUser}
                    />
                )
                break;
            case "password":
                setRenderComponent(
                    <Text>password</Text>
                )
                break;
        }
        setshowModal(true)
    }

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
            <Modal
                isVisible={showModal}
                setVisible={setshowModal}
            >
                {
                    renderComponent
                }

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    }

})
