import React, { Fragment } from 'react'
import './Home.css'


const Home = () => (
  <Fragment>
    <header className="header">
  <div className='title'>
    <h1 >Welcome To Movie and Game</h1>
  </div>
  <div className="button"> 
    <a href="/movie" className="btn1">DAFTAR MOVIE</a>
    <a href="/game" className="btn2">DAFTAR GAME</a>
  </div>
  </header>
  </Fragment>
);

{/* <MovieList />
            <GameList /> */}

export default Home