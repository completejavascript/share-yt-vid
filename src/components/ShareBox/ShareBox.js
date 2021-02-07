import React, { useCallback } from 'react';
import useInput from '../../hooks/useInput';
import { useAuthContext } from '../../provider/Auth';
import { addNotiError, addNotiSuccess } from '../../utils/notification';
import { validateYoutubeUrl } from '../../utils/helpers';
import { addMovie } from '../../firebase/firebaseStore';
import './ShareBox.scss';

const ShareBox = () => {
  const { value: url, handleOnChange: handleSetUrl } = useInput('');
  const { setLoading, setLoadingText } = useAuthContext();

  const handleShare = useCallback(
    async (event) => {
      event.preventDefault();
      const { url } = event.target.elements;
      const formatedUrl = url.value.trim();

      if (!validateYoutubeUrl(formatedUrl)) {
        addNotiError({
          title: 'Share Error',
          message: 'Youtube URL is invalid',
        });
        return;
      }

      setLoading(true);
      setLoadingText('Sharing the movie...');
      try {
        await addMovie({ url: formatedUrl });
        addNotiSuccess({
          title: 'Share Success',
          message: 'You shared the movie successfully',
        });
      } catch (error) {
        console.log('Add movie error:', { error });
        addNotiError({
          title: 'Share Error',
          message: error.message,
        });
      }
      setLoading(false);
      setLoadingText('');
    },
    [setLoading, setLoadingText]
  );

  return (
    <div className="sharebox-container">
      <form className="sharebox-form" onSubmit={handleShare}>
        <span className="sharebox-title">Share a Youtube movie</span>
        <div className="sharebox-url">
          <label htmlFor="url">Youtube URL:</label>
          <input
            autoFocus
            name="url"
            type="text"
            value={url}
            onChange={handleSetUrl}
          />
        </div>
        <div className="sharebox-submit">
          <input name="submit" type="submit" value="Share" disabled={!url} />
        </div>
      </form>
    </div>
  );
};

export default ShareBox;
