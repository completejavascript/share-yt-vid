import React from 'react';
import {
  ic_thumbs_up_regular,
  ic_thumbs_down_regular,
} from '../../assets/index';

const UnvoteItem = ({ handleVoteUp, handleVoteDown }) => {
  return (
    <div className="unvoted-item">
      <img
        className="icon"
        src={ic_thumbs_up_regular}
        alt="thumbs up regular icon"
        onClick={handleVoteUp}
      />
      <img
        className="icon"
        src={ic_thumbs_down_regular}
        alt="thumbs down regular icon"
        onClick={handleVoteDown}
      />
    </div>
  );
};

export default UnvoteItem;
