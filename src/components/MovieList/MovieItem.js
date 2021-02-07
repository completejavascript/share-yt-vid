import React from 'react';
import VoteContainer from '../VoteContainer/VoteContainer';

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-item">
      <div className="video-container">
        <iframe
          title={movie.title}
          frameBorder="0"
          allow="fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
          src={`https://www.youtube.com/embed/${movie.video_id}?autoplay=0`}
        />
      </div>
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
        <div>
          <span className="txt-medium">Description:</span>
        </div>
        <p className="description">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieItem;
