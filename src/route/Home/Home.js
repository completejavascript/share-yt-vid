import React from 'react';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <MovieList />
    </div>
  );
};

export default Home;
