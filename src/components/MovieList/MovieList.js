import React, { useEffect, useCallback, useState } from 'react';
import { useAuthContext } from '../../provider/Auth';
import { getMovies } from '../../firebase/firebaseStore';
import { addNotiError } from '../../utils/notification';
import MovieItem from './MovieItem';
import './MovieList.scss';

const MovieList = () => {
  const { setLoading, setLoadingText } = useAuthContext();

  const [offset, setOffset] = useState(-1);
  const [movies, setMovies] = useState([]);

  const handleGetMovies = useCallback(async () => {
    setLoading(true);
    setLoadingText('Getting movies...');

    try {
      const data = await getMovies();
      const docs = data.docs;
      setMovies(docs.map((doc) => doc.data()));
      setOffset(docs.length - 1);
    } catch (error) {
      console.log('Getting movies error:', { error });
      addNotiError({
        title: 'Getting Movies Error',
        message: error.message,
      });
    }

    setLoading(false);
    setLoadingText('');
  }, [setLoading, setLoadingText]);

  useEffect(() => {
    handleGetMovies(offset);
  }, [handleGetMovies, offset]);

  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <MovieItem key={movie.video_id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
