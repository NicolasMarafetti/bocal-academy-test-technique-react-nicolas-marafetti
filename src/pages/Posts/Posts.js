/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import "./Posts.css";

const SERVER_URL = "https://social-network-api.osc-fr1.scalingo.io/";
const PROJECT_NAME = "test-technique-react-nicolas-marafetti";

/**
 * Cette fonction est un composant React qui représente la page des publication.
 */
export default function Posts() {

  const [state, setState] = useState({ page: 0, posts: [] })

  /**
   * Récupération des posts au moment de la création de la page
   */
  useEffect(() => {

    fetch(`${SERVER_URL}${PROJECT_NAME}/posts?page=${state.page}&limit=20`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status !== 200) throw new Error("HTTP status : " + response.status);

        return response.json();
      })
      .then((data) => {
        setState({
          ...state,
          posts: data.posts
        })
      })
      .catch((error) => {
        // En cas d'erreur
        setState({ ...state, loading: false, error: error.toString() })
      })
  }, [state.page])

  /**
   * Function to manage the next page click
   */
  const nextPageClicked = () => {
    setState({ ...state, page: state.page + 1 })
  }

  /**
   * Function to manage the previous page click
   */
  const previousPageClicked = () => {
    setState({ ...state, page: state.page - 1 })
  }

  return (
    <main id="posts">
      {state.error && <p>{state.error}</p>}
      <ul>
        {state.posts.map((post) => (
          <li className="post" key={post._id}>
            <p className="font-bold">{post.title}</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        {state.page > 0 && <button className="mx-4" onClick={previousPageClicked}>Previous Page</button>}
        {state.posts.length === 20 && <button className="mx-4" onClick={nextPageClicked}>Next Page</button>}
      </div>
    </main>
  )
}
