import React, { useRef, useState } from 'react'

const SERVER_URL = "https://social-network-api.osc-fr1.scalingo.io/";
const PROJECT_NAME = "test-technique-react-nicolas-marafetti";

/**
 * Cette fonction est un composant React qui représente la page d'ajout de publication.
 */
export default function AddPost() {

  // Gestion de l'état du composant
  const [state, setState] = useState({ loading: false, success: false, error: "" })

  const inputTitle = useRef();
  const inputContent = useRef();

  const userToken = localStorage.getItem("token");

  const submitForm = (e) => {
    e.preventDefault();

    const title = inputTitle.current.value;
    const content = inputContent.current.value;

    const requestBody = { title, content };

    setState({ ...state, loading: true })

    fetch(`${SERVER_URL}${PROJECT_NAME}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${userToken}`
      },
      body: JSON.stringify(requestBody)
    })
      .then((data) => {
        if (data.status !== 200) throw new Error("HTTP status " + data.status);

        // En cas de succès
        setState({ ...state, loading: false, success: true })
      })
      .catch((error) => {
        // En cas d'erreur
        setState({ ...state, loading: false, error: error.toString() })
      })
  }

  return (
    <main>
      <h2>Ajout d'une publication</h2>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title">Titre</label>
          <input id="title" type="text" ref={inputTitle} required />
        </div>
        <div>
          <label htmlFor="content">Contenu</label>
          <textarea id="content" ref={inputContent} required></textarea>
        </div>
        <div>
          {state.success && <p>La publication a bien été envoyé !</p>}
          {state.error && <p>{state.error}</p>}
        </div>
        <div>
          <input disabled={state.success || state.loading} type="submit" value="Envoyer la publication" />
        </div>
      </form>
    </main>
  )
}
