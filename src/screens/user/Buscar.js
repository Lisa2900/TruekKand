import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../../firebase/Credenciales'; // Importar las credenciales de Firebase

function Buscar() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const firestore = getFirestore(firebaseApp); // Obtener la instancia de Firestore con las credenciales

  useEffect(() => {
    async function buscarProductos() {
      try {
        const productosRef = collection(firestore, 'productos');
        const q = query(productosRef, where('nombre', '==', busqueda));
        const querySnapshot = await getDocs(q);

        const productosEncontrados = [];
        querySnapshot.forEach((doc) => {
          productosEncontrados.push({ id: doc.id, ...doc.data() });
        });

        setResultados(productosEncontrados);
      } catch (error) {
        console.error('Error al buscar productos:', error.message);
      }
    }

    if (busqueda.trim() !== '') {
      buscarProductos();
    } else {
      setResultados([]);
    }
  }, [busqueda, firestore]);

  return (
    <View>
      <Text>Buscar Productos</Text>
      <TextInput
        placeholder="Buscar por nombre"
        value={busqueda}
        onChangeText={(text) => setBusqueda(text)}
      />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
            <Text>Precio: ${item.precio}</Text>
            <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
          </View>
        )}
      />
    </View>
  );
}

export default Buscar;
