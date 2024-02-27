import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Registro from '../screens/Register';
import AdminDashboard from '../screens/admin/AdmiDashboard';
import HomeUser from '../screens/user/HomeUser';
import firebaseApp from '../firebase/Credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Buscar from '../screens/user/Buscar';
import Publicar from '../screens/user/Publicar';
import CerrarSesion from '../screens/user/CerrarSesion';
import CerrarSesionAdmin from '../screens/admin/CerrarSesionAdmin';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const Tab = createBottomTabNavigator();

function AppNavigator() {
    const [tipoUsuario, setTipoUsuario] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setUserWithFirebaseAndRol(usuarioFirebase);
            } else {
                setTipoUsuario('');
            }
        });

        return unsubscribe; // Limpieza del efecto
    }, []); // Se ejecuta solo una vez al montar el componente

    async function getRol(uid) {
        const docuRef = doc(firestore, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        return docuCifrada.data().rol;
    }

    async function setUserWithFirebaseAndRol(usuarioFirebase) {
        const rol = await getRol(usuarioFirebase.uid);
        setTipoUsuario(rol);
    }

    const getRutasPorTipoUsuario = () => {
        switch (tipoUsuario) {
            case 'admin':
                return <>
                <Tab.Screen name="AdminDashboard" component={AdminDashboard} />
                <Tab.Screen name="salir" component={CerrarSesionAdmin} />
                
                </>;
            case 'user':
                return <>
                <Tab.Screen name="HomeUser" component={HomeUser} />
                <Tab.Screen name='Buscar' component={Buscar} />
                <Tab.Screen name='Publicar' component={Publicar}/>
                <Tab.Screen name="Salir" component={CerrarSesion} />
                
                </>;
            default:
                return (
                    <>
                        <Tab.Screen name="Home" component={Home} />
                        <Tab.Screen name="Login" component={Login} />
                        <Tab.Screen name="Registro" component={Registro} />

                    </>
                );
        }
    };

    return (
        <NavigationContainer>
            <Tab.Navigator>
                {getRutasPorTipoUsuario()}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
