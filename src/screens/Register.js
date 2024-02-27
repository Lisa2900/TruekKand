import React, { useState } from 'react';
import firebaseApp from '../firebase/Credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);

function Register() {
  const firestore = getFirestore(firebaseApp);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);

    setDoc(docuRef, {
      correo: email,
      rol: rol
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    registrarUsuario(email, password, rol);
  }

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={submitHandler}>
        <label>
          Correo Electrónico:
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
        <input type='submit' value="Registrar" />
      </form>
    </div>
  );
}

export default Register;
