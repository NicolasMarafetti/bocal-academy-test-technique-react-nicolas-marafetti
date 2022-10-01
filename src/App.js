import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';
import Header from './components/Header/Header';
import AddPost from './pages/AddPost/AddPost';

/*
  Cette fonction est un component React,
  Je définis dans mon component App les pages disponible dans mon application.
*/
function App(props) {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/add_post" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
