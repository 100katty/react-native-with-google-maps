import React, { useContext } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionContext } from '../context/PermissionContext';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext(PermissionContext);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Es necesario el uso de GPS para usar esta aplicación</Text>
            <Text style={{ marginTop: 20 }} >{JSON.stringify(permissions, null, 5)} </Text>
            <BlackButton title="Permiso" onPress={askLocationPermission} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: '20'

    }
});
