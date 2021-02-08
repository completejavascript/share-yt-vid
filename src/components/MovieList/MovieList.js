import React, { useEffect, useCallback, useState, useRef } from 'react';
import MovieItem from './MovieItem';
import { useAuthContext } from '../../provider/Auth';
import { getMovies } from '../../firebase/firebaseStore';
import { addNotiError, addNotiSuccess } from '../../utils/notification';
import './MovieList.scss';

const FETCH_LIMIT = 4;

const MovieList = () => {
  const { setLoading, setLoadingText } = useAuthContext();
  const [movies, setMovies] = useState([]);
  const needFetch = useRef(true);

  const handleGetMovies = useCallback(async () => {
    setLoading(true);
    setLoadingText('Getting movies...');

    try {
      const moviesCnt = movies.length;
      const last_date =
        moviesCnt > 0 ? movies[moviesCnt - 1].created_date : undefined;
      const data = await getMovies({ last_date, limit: FETCH_LIMIT });
      needFetch.current = false;

      const newMovies = data.docs.map((doc) => doc.data());
      if (newMovies.length > 0) {
        setMovies([...movies, ...newMovies]);
      } else {
        addNotiSuccess({
          title: 'Getting Movies Success',
          message: 'There are no more movies right now',
        });
      }
    } catch (error) {
      console.log('Getting movies error:', { error });
      addNotiError({
        title: 'Getting Movies Error',
        message: error.message,
      });
    }

    setLoading(false);
    setLoadingText('');
  }, [setLoading, setLoadingText, movies, needFetch]);

  const handleLoadMore = useCallback(async () => {
    needFetch.current = true;
    handleGetMovies();
  }, [handleGetMovies]);

  useEffect(() => {
    if (needFetch.current) {
      needFetch.current = false;
      handleGetMovies();
    }
  }, [handleGetMovies, needFetch]);

  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <MovieItem key={movie.video_id} movie={movie} />
      ))}
      <div className="btn-loadmore-wrapper">
        <button onClick={handleLoadMore}>Load more</button>
      </div>
    </div>
  );
};

export default MovieList;
