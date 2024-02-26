import React, { useState } from 'react';
import firebaseApp from '../firebase/Credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);

    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);

    setDoc(docuRef, {
      correo: email,
      rol: rol
    })

  }

  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;
    console.log("submit", email, password, rol);

    if (isRegistrando) {
      registrarUsuario(email, password, rol)
    } else {

      signInWithEmailAndPassword(auth, email, password);

    }}

    return <div>
      <h1>{isRegistrando ? "Registrando" : "Inicia Sesion"}</h1>
      <form onSubmit={submitHandler}>
        <label>
          Correo Electronico:
          <input type='email' id='email' />
        </label>
        <label>
          Contraseña:
          <input type='password' id='password' />
        </label>
        <label>
          Rol:
          <select id='rol'>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </label>
        <input type='submit' value={isRegistrando ? "Registrar" : "Iniciar Sesion"} />

      </form>

      <button onClick={() => setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo Cuenta" : "Quiero Registrarme"}
      </button>
    </div>;
  }

  export default Login
