import React, { useEffect, useCallback, useState } from 'react';
import { useAuthContext } from '../../provider/Auth';
import { getMovies } from '../../firebase/firebaseStore';
import { addNotiError } from '../../utils/notification';
import './MovieList.scss';

const MovieItem = ({ data }) => {
  return (
    <div className="movie-item">
      <div className="video-container">
        <iframe
          frameBorder="0"
          allow="fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
          src={`https://www.youtube.com/embed/${data.video_id}?autoplay=0`}
        />
      </div>
      <div className="video-info">
        <div className="title">{data.title}</div>
        <div className="share-by">Shared by: {data.shared_by}</div>
        <div>Description:</div>
        <p className="description">{data.description}</p>
      </div>
    </div>
  );
};

const MovieList = () => {
  const { currentUser, setLoading, setLoadingText } = useAuthContext();

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
        <MovieItem key={movie.video_id} data={movie} />
      ))}
    </div>
  );
};

export default MovieList;
