import React from 'react'
import Navigation from '../Navigation/Navigation'

import "./Header.css";

/*
  Cette fonction est un composant React qui représente le haut de page (header).
*/
export default function Header(props) {
  return (
    <header>
      <h1>Test Technique - React - Nicolas Marafetti</h1>
      <Navigation />
    </header>
  )
}
