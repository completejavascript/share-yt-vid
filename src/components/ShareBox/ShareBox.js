import React from 'react';
import useInput from '../../hooks/useInput';
import './ShareBox.scss';

const ShareBox = () => {
  const { value: url, handleOnChange: handleSetUrl } = useInput('');

  const handleShare = () => {};

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
