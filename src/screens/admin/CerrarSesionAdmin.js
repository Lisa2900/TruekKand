import React from 'react';
import { View, Text, Button } from 'react-native';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../firebase/Credenciales'; // Importar las credenciales de Firebase

function CerrarSesionAdmin() {
    const auth = getAuth(firebaseApp); // Obtener la instancia de Auth con las credenciales

    const handleCerrarSesion = () => {
        auth.signOut().then(() => {
            console.log('Sesión cerrada exitosamente');
        }).catch((error) => {
            console.error('Error al cerrar sesión:', error.message);
        });
    };

    return (
        <View>
            <Text>Cerrar Sesión</Text>
            <Button title="Cerrar Sesión" onPress={handleCerrarSesion} />
        </View>
    );
}

export default CerrarSesionAdmin;
