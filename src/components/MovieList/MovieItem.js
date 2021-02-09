import React, { useState, useCallback } from 'react';
import VoteContainer from '../VoteContainer/VoteContainer';
import VideoPlaceholder from '../VideoPlaceholder/VideoPlaceholder';

const MovieItem = ({ movie }) => {
  const [hasLoadIframe, setHasLoadIframe] = useState(false);

  const handleClickPlaceholder = useCallback(() => {
    setHasLoadIframe(true);
  }, []);

  return (
    <div className="movie-item">
      {hasLoadIframe ? (
        <div className="video-container">
          <iframe
            title={movie.title}
            frameBorder="0"
            loading="lazy"
            allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
            src={`https://www.youtube.com/embed/${movie.video_id}?autoplay=1`}
          />
        </div>
      ) : (
        <VideoPlaceholder
          className="video-placeholder"
          thumbnail={movie.thumbnail}
          handleClick={handleClickPlaceholder}
        />
      )}
      <div className="video-info">
        <div className="title">
          <a
            href={`https://www.youtube.com/watch?v=${movie.video_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movie.title}
          </a>
        </div>
        <div className="share-vote-wrapper">
          <div className="shared-by" title={movie.shared_by}>
            <span className="txt-medium">Shared by:</span> {movie.shared_by}
          </div>
          <VoteContainer movie={movie} />
        </div>
        <div className="txt-medium">Description:</div>
        <p className="description">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieItem;
