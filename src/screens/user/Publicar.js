import React, { useState } from 'react';
import { storage } from 'firebase/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../firebase/Credenciales'; // Importar las credenciales de Firebase

function Publicar() {
    const firestore = getFirestore(firebaseApp); // Obtener la instancia de Firestore con las credenciales
    const auth = getAuth(firebaseApp); // Obtener la instancia de Auth con las credenciales

    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleImagenChange = (e) => {
        if (e.target.files[0]) {
            setImagen(e.target.files[0]);
        }
    };

    const handlePublicarProducto = async () => {
        try {
            if (!nombreProducto || !descripcionProducto || !precioProducto || !imagen) {
                console.error('Por favor, completa todos los campos');
                return;
            }

            const user = auth.currentUser;
            if (!user) {
                console.error('Usuario no autenticado');
                return;
            }

            const storageRef = ref(storage, `imagenes/${imagen.name}`, { authToken: user.accessToken });
            await uploadBytes(storageRef, imagen);
            const imageUrl = await getDownloadURL(storageRef, { authToken: user.accessToken });

            const productosRef = collection(firestore, 'productos');
            await addDoc(productosRef, {
                nombre: nombreProducto,
                descripcion: descripcionProducto,
                precio: precioProducto,
                imageUrl: imageUrl,
                userId: user.uid,
            });

            console.log('Producto publicado exitosamente');
        } catch (error) {
            console.error('Error al publicar el producto:', error);
        }
    };


    return (
        <div>
            <h2>Publicar Producto</h2>
            <div>
                <label>Nombre del Producto:</label>
                <input type="text" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
            </div>
            <div>
                <label>Descripción del Producto:</label>
                <input type="text" value={descripcionProducto} onChange={(e) => setDescripcionProducto(e.target.value)} />
            </div>
            <div>
                <label>Precio del Producto:</label>
                <input type="number" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} />
            </div>
            <div>
                <label>Imagen del Producto:</label>
                <input type="file" onChange={handleImagenChange} />
            </div>
            <button onClick={handlePublicarProducto}>Publicar Producto</button>
        </div>
    );
}

export default Publicar;
