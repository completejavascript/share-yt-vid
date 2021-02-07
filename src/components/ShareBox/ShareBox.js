import React, { useCallback } from 'react';
import useInput from '../../hooks/useInput';
import { addNotiError } from '../../notification';
import { validateYoutubeUrl } from '../../utils/helpers';
import './ShareBox.scss';

const ShareBox = () => {
  const { value: url, handleOnChange: handleSetUrl } = useInput('');

  const handleShare = useCallback((event) => {
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

    // TODO:
    console.log({ formatedUrl });
  }, []);

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
