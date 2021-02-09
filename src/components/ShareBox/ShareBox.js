import React, { useCallback } from 'react';
import useInput from '../../hooks/useInput';
import { useAuthContext } from '../../provider/Auth';
import { addNotiError, addNotiSuccess } from '../../utils/notification';
import { getYoutubeVideoId, getYoutubeVideoInfo } from '../../utils/helpers';
import { addMovie } from '../../firebase/firebaseStore';
import { img_video_placeholder } from '../../assets/index';
import './ShareBox.scss';

const ShareBox = () => {
  const { value: url, handleOnChange: handleSetUrl } = useInput('');
  const { setLoading, setLoadingText } = useAuthContext();

  const handleShare = useCallback(
    async (event) => {
      event.preventDefault();
      const { url } = event.target.elements;

      // Get Youtube video's id
      const video_id = getYoutubeVideoId(url.value.trim());
      if (!video_id) {
        addNotiError({
          title: 'Share Error',
          message: "Youtube Video's URL is invalid",
        });
        return;
      }

      // Get Youtube video's info
      setLoading(true);
      setLoadingText('Getting the movie info...');

      let error = null;
      let title = 'Movie title';
      let description = 'Movie description';
      let thumbnail = img_video_placeholder;

      try {
        const data = await getYoutubeVideoInfo(video_id);
        if (data && data.items && data.items.length > 0) {
          title = data.items[0].snippet?.title ?? title;
          description = data.items[0].snippet?.description ?? description;
          thumbnail =
            data.items[0].snippet?.thumbnails?.standard?.url ?? thumbnail;
        }
      } catch (err1) {
        console.log('Get videoInfo error:', { err1 });
        error = err1;
      }

      if (!error) {
        // Add the movie to firebase
        setLoadingText('Sharing the movie...');
        try {
          await addMovie({ video_id, title, description, thumbnail });
          addNotiSuccess({
            title: 'Share Success',
            message: 'You shared the movie successfully',
          });
        } catch (err2) {
          console.log('Add movie error:', { err2 });
          error = err2;
        }
      }

      if (error) {
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
