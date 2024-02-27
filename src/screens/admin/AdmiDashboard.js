import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth, listUsers, deleteUser } from 'firebase/auth';
import firebaseApp from '../../firebase/Credenciales'; // Importar las credenciales de Firebase

function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', descripcion: '', precio: '', imageUrl: '' });
  const [nuevoUsuario, setNuevoUsuario] = useState({ email: '', password: '', displayName: '' });
  const firestore = getFirestore(firebaseApp); // Obtener la instancia de Firestore con las credenciales
  const auth = getAuth(firebaseApp); // Obtener la instancia de Auth con las credenciales

  useEffect(() => {
    cargarProductos();
    cargarUsuarios();
  }, []);

  const cargarProductos = async () => {
    try {
      const productosRef = collection(firestore, 'productos');
      const querySnapshot = await getDocs(productosRef);
      const productosList = [];
      querySnapshot.forEach((doc) => {
        productosList.push({ id: doc.id, ...doc.data() });
      });
      setProductos(productosList);
    } catch (error) {
      console.error('Error al cargar productos:', error.message);
    }
  };

  const cargarUsuarios = async () => {
    try {
      const users = await listUsers(auth); // Cambio realizado aquí
      setUsuarios(users);
    } catch (error) {
      console.error('Error al cargar usuarios:', error.message);
    }
  };


  const crearProducto = async () => {
    try {
      await addDoc(collection(firestore, 'productos'), nuevoProducto);
      console.log('Producto creado correctamente');
      cargarProductos();
    } catch (error) {
      console.error('Error al crear producto:', error.message);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'productos', id));
      console.log('Producto eliminado correctamente');
      cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error.message);
    }
  };

  const crearUsuario = async () => {
    try {
      // Código para crear usuario en Firebase Auth
      console.log('Usuario creado correctamente');
      cargarUsuarios();
    } catch (error) {
      console.error('Error al crear usuario:', error.message);
    }
  };

  const eliminarUsuario = async (uid) => {
    try {
        // Eliminar el usuario de Firebase Authentication
        console.log('Usuario eliminado correctamente');
        cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
    }
};


  return (
    <View>
      <Text>Panel de Administrador</Text>
      
      {/* CRUD de Productos */}
      <View>
        <Text>Productos</Text>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nombre}</Text>
              <Text>{item.descripcion}</Text>
              <Text>Precio: ${item.precio}</Text>
              <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
              <Button title="Eliminar" onPress={() => eliminarProducto(item.id)} />
            </View>
          )}
        />
        <Text>Agregar Nuevo Producto</Text>
        <TextInput placeholder="Nombre" value={nuevoProducto.nombre} onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, nombre: text })} />
        <TextInput placeholder="Descripción" value={nuevoProducto.descripcion} onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, descripcion: text })} />
        <TextInput placeholder="Precio" value={nuevoProducto.precio} onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, precio: text })} />
        <TextInput placeholder="URL de la imagen" value={nuevoProducto.imageUrl} onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, imageUrl: text })} />
        <Button title="Crear Producto" onPress={crearProducto} />
      </View>
      
      {/* CRUD de Usuarios */}
      <View>
        <Text>Usuarios</Text>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View>
              <Text>Nombre: {item.displayName}</Text>
              <Text>Correo: {item.email}</Text>
              <Button title="Eliminar" onPress={() => eliminarUsuario(item.uid)} />
            </View>
          )}
        />
        <Text>Agregar Nuevo Usuario</Text>
        <TextInput placeholder="Correo" value={nuevoUsuario.email} onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, email: text })} />
        <TextInput placeholder="Contraseña" value={nuevoUsuario.password} onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, password: text })} />
        <TextInput placeholder="Nombre" value={nuevoUsuario.displayName} onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, displayName: text })} />
        <Button title="Crear Usuario" onPress={crearUsuario} />
      </View>
    </View>
  );
}

export default AdminDashboard;
