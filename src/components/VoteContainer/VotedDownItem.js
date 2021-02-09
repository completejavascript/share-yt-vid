import React from 'react';
import { ic_thumbs_down_solid } from '../../assets/index';

const VotedDownItem = ({ handleUnVoteDown }) => {
  return (
    <div className="vote-up-item">
      <img
        className="icon"
        src={ic_thumbs_down_solid}
        alt="thumbs up solid icon"
        width="20"
        height="20"
        onClick={handleUnVoteDown}
      />
    </div>
  );
};

export default VotedDownItem;
