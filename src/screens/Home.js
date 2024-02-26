import React from 'react';
import{getAuth,signOut}from'firebase/auth';
import firebaseApp from '../firebase/Credenciales';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
const auth=getAuth(firebaseApp)
function Home({user}) {
  return (
    <div>
      Home
      <button onClick={()=>signOut(auth)}>Cerrar Sesion</button>
      
      {user.rol=="admin"?<AdminView/>:<UserView/> }
    </div>
  )
}

export default Home
