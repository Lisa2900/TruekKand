import React from 'react';
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
        <div>
            <h2>Cerrar Sesión</h2>
            <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>
    );
}

export default CerrarSesionAdmin;
