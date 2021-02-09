import firebase from 'firebase';
import firebaseApp from './firebaseApp';

const MOVIE_COLLECTION = 'movies';

export const addMovie = ({ video_id, title, description, thumbnail }) => {
  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .doc(video_id)
    .set({
      video_id,
      title,
      shared_by: firebaseApp.auth().currentUser.email,
      description,
      thumbnail,
      created_date: firebase.firestore.FieldValue.serverTimestamp(),
      updated_date: firebase.firestore.FieldValue.serverTimestamp(),
      voted_date: 0,
      upvoted_users: [],
      downvoted_users: [],
    });
};

export const getMovies = ({ last_date, limit = 6 } = {}) => {
  if (!last_date) {
    return firebaseApp
      .firestore()
      .collection(MOVIE_COLLECTION)
      .orderBy('created_date', 'desc')
      .limit(limit)
      .get();
  }

  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .orderBy('created_date', 'desc')
    .startAfter(last_date)
    .limit(limit)
    .get();
};

export const voteUp = (data) => {
  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .doc(data.video_id)
    .set({
      ...data,
      voted_date: firebase.firestore.FieldValue.serverTimestamp(),
      upvoted_users: Array.from(
        new Set(data.upvoted_users).add(firebaseApp.auth().currentUser.email)
      ),
    });
};

export const unVoteUp = (data) => {
  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .doc(data.video_id)
    .set({
      ...data,
      voted_date: firebase.firestore.FieldValue.serverTimestamp(),
      upvoted_users: data.upvoted_users.filter(
        (email) => email !== firebaseApp.auth().currentUser.email
      ),
    });
};

export const voteDown = (data) => {
  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .doc(data.video_id)
    .set({
      ...data,
      voted_date: firebase.firestore.FieldValue.serverTimestamp(),
      downvoted_users: Array.from(
        new Set(data.downvoted_users).add(firebaseApp.auth().currentUser.email)
      ),
    });
};

export const unVoteDown = (data) => {
  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .doc(data.video_id)
    .set({
      ...data,
      voted_date: firebase.firestore.FieldValue.serverTimestamp(),
      downvoted_users: data.downvoted_users.filter(
        (email) => email !== firebaseApp.auth().currentUser.email
      ),
    });
};
