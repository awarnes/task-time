import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDVcfLev_1_zgxgd5Mx7SdpAAsj5rEvfxk",
  authDomain: "task-time-mv.firebaseapp.com",
  databaseURL: "https://task-time-mv.firebaseio.com",
  projectId: "task-time-mv",
};

const fire = firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = fire.auth();

export default fire;
