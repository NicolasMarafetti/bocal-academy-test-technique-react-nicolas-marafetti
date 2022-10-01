import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import "./Navigation.css";

/*
  Cette fonction est un composant React qui représente le menu de navigation.
*/
export default function Navigation(props) {

  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  const logOut = () => {
    console.log("logout");

    localStorage.removeItem("token");

    return navigate("/");
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
          {
            !userToken && <>
              <Link to="/signin">Inscription</Link>
              <Link to="/login">Connexion</Link>
            </>
          }
          <Link to="/posts">Publications</Link>
          {
            userToken && <>
              <Link to="/add_post">Ajouter une publication</Link>
              <button onClick={logOut}>Déconnexion</button>
            </>
          }
        </li>
      </ul>
    </nav>
  )
}
