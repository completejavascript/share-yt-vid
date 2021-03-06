import React from 'react';
import { ic_thumbs_up_solid } from '../../assets/index';

const VotedUpItem = ({ handleUnVoteUp }) => {
  return (
    <div className="vote-up-item">
      <img
        className="icon"
        src={ic_thumbs_up_solid}
        alt="thumbs up solid icon"
        width="20"
        height="20"
        onClick={handleUnVoteUp}
      />
    </div>
  );
};

export default VotedUpItem;
