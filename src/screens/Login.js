import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebase/Credenciales'; // Asegúrate de importar correctamente tu configuración de Firebase

const auth = getAuth(firebaseApp);

const Login = () => {
  const submitHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <Text>Inicia Sesión</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <Button title="Iniciar Sesión" onPress={submitHandler} />
    </View>
  );
};

export default Login;
