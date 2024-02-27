import React, { useState, useEffect } from 'react';
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
    <div>
      <h2>Buscar Productos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <ul>
        {resultados.map((producto) => (
          <li key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <img src={producto.imageUrl} alt={producto.nombre} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buscar;
