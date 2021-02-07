import firebase from 'firebase';
import firebaseApp from './firebaseApp';

const MOVIE_COLLECTION = 'movies';

export const addMovie = ({ video_id, title, description }) => {
  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .doc(video_id)
    .set({
      video_id,
      title: title,
      shared_by: firebaseApp.auth().currentUser.email,
      description: description,
      created_date: firebase.firestore.FieldValue.serverTimestamp(),
      updated_date: firebase.firestore.FieldValue.serverTimestamp(),
      voted_date: 0,
      upvoded_users: [],
      downvoted_users: [],
    });
};
