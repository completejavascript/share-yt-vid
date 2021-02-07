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
      upvoted_users: [],
      downvoted_users: [],
    });
};

export const getMovies = ({ offset = -1, limit = 6 } = {}) => {
  return firebaseApp
    .firestore()
    .collection(MOVIE_COLLECTION)
    .orderBy('created_date')
    .startAfter(offset)
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
      upvoted_users: [
        ...data.upvoted_users,
        firebaseApp.auth().currentUser.email,
      ],
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
      downvoted_users: [
        ...data.downvoted_users,
        firebaseApp.auth().currentUser.email,
      ],
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
