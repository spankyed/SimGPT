import React from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom';
import './home.css'

export default ({}: any) => {
  return (
    <>
    <div className="home-page">
      <div className="hero">
        <h1>SimGPT</h1>
        <h2>Generative agents</h2>
      </div>
      <div className="buttons">
        <Link to="/simulator" className="button">Join</Link>
        <a href="https://github.com" className="button">Github</a>
      </div>
    </div>
    </>
  );
}
