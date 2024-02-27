import React, { useState } from 'react';
import firebaseApp from '../firebase/Credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { View, Text, TextInput, Button, Alert } from 'react-native'; // Importar Alert desde 'react-native'
import { Picker } from '@react-native-picker/picker';

const auth = getAuth(firebaseApp);

function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('user'); // Valor predeterminado de 'user'

  const firestore = getFirestore(firebaseApp);

  async function registrarUsuario() {
    try {
      const infoUsuario = await createUserWithEmailAndPassword(auth, email, password);

      const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);

      await setDoc(docuRef, {
        correo: email,
        rol: rol
      });

      // Limpiar campos después de registrar
      setEmail('');
      setPassword('');
      setRol('user');

      // Mostrar alerta de registro exitoso
      Alert.alert('Registro Exitoso', 'Usuario registrado correctamente.');

      // Redireccionar a la pantalla de inicio de sesión
      navigation.navigate('Login');
      
      // Puedes agregar redireccionamiento o cualquier otra lógica aquí después del registro exitoso
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

  return (
    <View>
      <Text>Registro</Text>
      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <Picker
        selectedValue={rol}
        onValueChange={value => setRol(value)}
      >
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Usuario" value="user" />
      </Picker>
      <Button title="Registrar" onPress={registrarUsuario} />
    </View>
  );
}

export default Register;
