import firebase from 'firebase';
import firebaseApp from './firebaseApp';

const MOVIE_COLLECTION = 'movies';

export const addMovie = ({ url }) => {
  return firebaseApp.firestore().collection(MOVIE_COLLECTION).add({
    url: url,
    title: 'title1',
    shared_by: firebaseApp.auth().currentUser.email,
    description: 'description 1',
    created_date: firebase.firestore.FieldValue.serverTimestamp(),
    updated_date: firebase.firestore.FieldValue.serverTimestamp(),
    voted_date: 0,
    upvoded_users: [],
    downvoted_users: [],
  });
};
