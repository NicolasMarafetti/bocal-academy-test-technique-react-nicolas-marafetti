import React, { useRef, useState } from 'react';

const SERVER_URL = "https://social-network-api.osc-fr1.scalingo.io/";
const PROJECT_NAME = "test-technique-react-nicolas-marafetti";

/**
 * Cette fonction est un composant React qui représente la page d'inscription.
 */
export default function Signin() {

  // Gestion de l'état du composant
  const [state, setState] = useState({ loading: false, success: false, error: "" })

  // Création de références, qui permettra de récupérer leur valeur au moment de l'envoi du formulaire.
  // Lié à la propriété ref.
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputFirstName = useRef();
  const inputLastName = useRef();

  /**
   * Cette fonction gère lors de l'envoi du formulaire
   * @param e : évènement de l'action
   * @return { void }
   */
  const sendForm = async (e) => {
    e.preventDefault();

    setState({ ...state, loading: true })

    // Récupération de la valeur des inputs grâce aux références
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const firstname = inputFirstName.current.value;
    const lastname = inputLastName.current.value;

    const requestBody = { email, password, firstname, lastname };

    // Le nom du serveur et le nom du projet viennent de nos variables crées au début du fichier.
    fetch(`${SERVER_URL}${PROJECT_NAME}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then((data) => {
        if (data.status !== 200) {
          return data.json().then(dataReadable => { throw new Error(dataReadable.message) })
        }

        // En cas de succès
        setState({ ...state, error: "", loading: false, success: true })
      })
      .catch((error) => {
        // En cas d'erreur
        setState({ ...state, loading: false, error: error.toString() })
      })
  }

  return (
    <main id="signin">
      <h2>Inscription</h2>
      <form onSubmit={sendForm}>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" id="email" ref={inputEmail} required />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" ref={inputPassword} required />
        </div>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input type="firstName" id="firstName" ref={inputFirstName} required />
        </div>
        <div>
          <label htmlFor="name">Nom</label>
          <input type="name" id="name" ref={inputLastName} required />
        </div>
        <div>
          {state.success && <p>Vous êtes bien inscris !</p>}
          {state.error && <p>{state.error}</p>}
        </div>
        <div>
          <input disabled={state.success || state.loading} type="submit" value="S'inscrire" />
        </div>
      </form>
    </main>
  )
}
