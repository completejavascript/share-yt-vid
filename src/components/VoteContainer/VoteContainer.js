import React, { useCallback, useState, useEffect } from 'react';
import { useAuthContext } from '../../provider/Auth';
import { addNotiError } from '../../utils/notification';
import UnvoteItem from './UnvoteItem';
import VotedUpItem from './VotedUpItem';
import VotedDownItem from './VotedDownItem';
import {
  voteUp,
  voteDown,
  unVoteUp,
  unVoteDown,
} from '../../firebase/firebaseStore';
import './VoteContainer.scss';

const STATUS_VOTED_UP = 'voted-up';
const STATUS_VOTED_DOWN = 'voted-down';
const STATUS_UN_VOTE = 'un-vote';
const STATUS_HIDE_VOTE = 'hide-vote';

const VoteContainer = ({ movie }) => {
  const { currentUser, setLoading, setLoadingText } = useAuthContext();

  const getCurrentVoteStatus = useCallback(() => {
    if (!currentUser || !currentUser.email || !movie) {
      return STATUS_HIDE_VOTE;
    }

    if (
      movie.upvoted_users &&
      movie.upvoted_users.includes(currentUser.email)
    ) {
      return STATUS_VOTED_UP;
    }

    if (
      movie.downvoted_users &&
      movie.downvoted_users.includes(currentUser.email)
    ) {
      return STATUS_VOTED_DOWN;
    }

    return STATUS_UN_VOTE;
  }, [currentUser, movie]);

  const [voteStatus, setVoteStatus] = useState(getCurrentVoteStatus());

  useEffect(() => {
    setVoteStatus(getCurrentVoteStatus());
  }, [getCurrentVoteStatus]);

  const handleVoteUp = useCallback(async () => {
    setLoading(true);
    setLoadingText('Processing...');

    try {
      await voteUp(movie);
      setVoteStatus(STATUS_VOTED_UP);
    } catch (error) {
      console.log('Vote Up Error:', { error });
      addNotiError({
        title: 'Vote Up Error',
        message: error.message,
      });
    }

    setLoading(false);
    setLoadingText('');
  }, [movie, setLoading, setLoadingText]);

  const handleUnVoteUp = useCallback(async () => {
    setLoading(true);
    setLoadingText('Processing...');

    try {
      await unVoteUp(movie);
      setVoteStatus(STATUS_UN_VOTE);
    } catch (error) {
      console.log('Un-vote Up Error:', { error });
      addNotiError({
        title: 'Un-vote Up Error',
        message: error.message,
      });
    }

    setLoading(false);
    setLoadingText('');
  }, [movie, setLoading, setLoadingText]);

  const handleVoteDown = useCallback(async () => {
    setLoading(true);
    setLoadingText('Processing...');

    try {
      await voteDown(movie);
      setVoteStatus(STATUS_VOTED_DOWN);
    } catch (error) {
      console.log('Vote Down Error:', { error });
      addNotiError({
        title: 'Vote Down Error',
        message: error.message,
      });
    }

    setLoading(false);
    setLoadingText('');
  }, [movie, setLoading, setLoadingText]);

  const handleUnVoteDown = useCallback(async () => {
    setLoading(true);
    setLoadingText('Processing...');

    try {
      await unVoteDown(movie);
      setVoteStatus(STATUS_UN_VOTE);
    } catch (error) {
      console.log('Un-vote Down Error:', { error });
      addNotiError({
        title: 'Un-vote Down Error',
        message: error.message,
      });
    }

    setLoading(false);
    setLoadingText('');
  }, [movie, setLoading, setLoadingText]);

  return (
    <div className="vote-container">
      {voteStatus === STATUS_VOTED_UP ? (
        <VotedUpItem handleUnVoteUp={handleUnVoteUp} />
      ) : null}
      {voteStatus === STATUS_VOTED_DOWN ? (
        <VotedDownItem handleUnVoteDown={handleUnVoteDown} />
      ) : null}
      {voteStatus === STATUS_UN_VOTE ? (
        <UnvoteItem
          handleVoteUp={handleVoteUp}
          handleVoteDown={handleVoteDown}
        />
      ) : null}
    </div>
  );
};

export default VoteContainer;
