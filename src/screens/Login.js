import React, { useState } from 'react';
import firebaseApp from '../firebase/Credenciales';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

function Login() {
  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <div>
      <h1>Inicia Sesión</h1>
      <form onSubmit={submitHandler}>
        <label>
          Correo Electrónico:
          <input type='email' id='email' />
        </label>
        <label>
          Contraseña:
          <input type='password' id='password' />
        </label>
        <input type='submit' value="Iniciar Sesión" />
      </form>
    </div>
  );
}

export default Login;
