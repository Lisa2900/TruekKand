import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../../firebase/Credenciales'; // Importar las credenciales de Firebase

function HomeUser() {
  const [productos, setProductos] = useState([]);
  const firestore = getFirestore(firebaseApp); // Obtener la instancia de Firestore con las credenciales

  useEffect(() => {
    async function cargarProductos() {
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
    }

    cargarProductos();
  }, []);

  return (
    <View>
      <Text>Productos Disponibles</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {productos.map((producto) => (
          <View key={producto.id} style={{ width: '50%' }}>
            <Text>{producto.nombre}</Text>
            <Text>{producto.descripcion}</Text>
            <Text>Precio: ${producto.precio}</Text>
            <Image source={{ uri: producto.imageUrl }} style={{ width: 100, height: 100 }} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default HomeUser;
