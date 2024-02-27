import React, { useState, useEffect } from 'react';
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
    <div>
      <h2>Productos Disponibles</h2>
      <div className="productos">
        {productos.map((producto) => (
          <div key={producto.id} className="producto">
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <img src={producto.imageUrl} alt={producto.nombre} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeUser;
