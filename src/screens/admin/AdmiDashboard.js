import React, { useState, useEffect } from 'react';
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
      const userCredential = await createUserWithEmailAndPassword(auth, nuevoUsuario.email, nuevoUsuario.password);
      await updateProfile(userCredential.user, { displayName: nuevoUsuario.displayName });
      console.log('Usuario creado correctamente');
      cargarUsuarios();
    } catch (error) {
      console.error('Error al crear usuario:', error.message);
    }
  };

  const eliminarUsuario = async (uid) => {
    try {
        // Eliminar el usuario de Firebase Authentication
        await deleteUser(auth, uid);

        // Eliminar los datos relacionados del usuario de Firestore
        await deleteDoc(doc(firestore, 'usuarios', uid));

        console.log('Usuario eliminado correctamente');
        cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
    }
};


  return (
    <div>
      <h2>Panel de Administrador</h2>
      
      {/* CRUD de Productos */}
      <div>
        <h3>Productos</h3>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              <h4>{producto.nombre}</h4>
              <p>{producto.descripcion}</p>
              <p>Precio: ${producto.precio}</p>
              <img src={producto.imageUrl} alt={producto.nombre} />
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
        <h4>Agregar Nuevo Producto</h4>
        <input type="text" placeholder="Nombre" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} />
        <input type="text" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })} />
        <input type="number" placeholder="Precio" value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} />
        <input type="text" placeholder="URL de la imagen" value={nuevoProducto.imageUrl} onChange={(e) => setNuevoProducto({ ...nuevoProducto, imageUrl: e.target.value })} />
        <button onClick={crearProducto}>Crear Producto</button>
      </div>
      
      {/* CRUD de Usuarios */}
      <div>
        <h3>Usuarios</h3>
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.uid}>
              <p>Nombre: {usuario.displayName}</p>
              <p>Correo: {usuario.email}</p>
              <button onClick={() => eliminarUsuario(usuario.uid)}>Eliminar</button>
            </li>
          ))}
        </ul>
        <h4>Agregar Nuevo Usuario</h4>
        <input type="email" placeholder="Correo" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
        <input type="password" placeholder="Contraseña" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
        <input type="text" placeholder="Nombre" value={nuevoUsuario.displayName} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, displayName: e.target.value })} />
        <button onClick={crearUsuario}>Crear Usuario</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
