import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getStorage, ref, uploadFile, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../firebase/Credenciales'; // Importar las credenciales de Firebase

function Publicar() {
    const firestore = getFirestore(firebaseApp); // Obtener la instancia de Firestore con las credenciales
    const auth = getAuth(firebaseApp); // Obtener la instancia de Auth con las credenciales
    const storage = getStorage(firebaseApp); // Obtener la instancia de Storage con las credenciales

    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleImagenChange = (e) => {
        // Implementa la lógica para seleccionar una imagen de la galería o la cámara
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

            const storageRef = ref(storage, `imagenes/${imagen.name}`);
            await uploadFile(storageRef, imagen);
            const imageUrl = await getDownloadURL(storageRef);

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
        <View>
            <Text>Publicar Producto</Text>
            <View>
                <Text>Nombre del Producto:</Text>
                <TextInput value={nombreProducto} onChangeText={(text) => setNombreProducto(text)} />
            </View>
            <View>
                <Text>Descripción del Producto:</Text>
                <TextInput value={descripcionProducto} onChangeText={(text) => setDescripcionProducto(text)} />
            </View>
            <View>
                <Text>Precio del Producto:</Text>
                <TextInput value={precioProducto} onChangeText={(text) => setPrecioProducto(text)} />
            </View>
            <View>
                <Text>Imagen del Producto:</Text>
                {/* Implementa el componente para seleccionar una imagen */}
            </View>
            <Button title="Publicar Producto" onPress={handlePublicarProducto} />
        </View>
    );
}

export default Publicar;
