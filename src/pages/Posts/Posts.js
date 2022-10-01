/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react'

import "./Posts.css";

const SERVER_URL = "https://social-network-api.osc-fr1.scalingo.io/";
const PROJECT_NAME = "test-technique-react-nicolas-marafetti";

const initialState = { error: "", loading: false, page: 0, posts: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'next-page': {
      return { ...state, page: state.page + 1 }
    }
    case 'update-posts': {
      return { ...state, posts: action.payload }
    }
    case 'set-error': {
      return { ...state, error: action.payload, loading: false, posts: [] }
    }
    default:
      return initialState;
  }
}

/**
 * Cette fonction est un composant React qui représente la page des publication.
 */
export default function Posts() {

  const [state, dispatch] = useReducer(reducer, initialState)

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
        dispatch({ type: 'update-posts', payload: data.posts })
      })
      .catch((error) => {
        // En cas d'erreur
        dispatch({ type: 'set-error', payload: error.toString() })
      })
  }, [state.page])

  /**
   * Function to manage the next page click
   */
  const nextPageClicked = () => {
    dispatch({ type: 'next-page' })
  }

  /**
   * Function to manage the previous page click
   */
  const previousPageClicked = () => {
    dispatch({ type: 'previous-page' })
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
