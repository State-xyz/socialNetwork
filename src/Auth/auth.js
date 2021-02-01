import firebase from "../firebase";

import bcrypt from "bcryptjs";

export const signUp = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        const currentUser = firebase.auth().currentUser;
        currentUser
          .updateProfile({
            displayName: user.name,
          })
          .then(() => {
            db.collection("users")
              .doc(data.user.uid)
              .set({
                uid: data.user.uid,
                name: user.name,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10),
                avatar: "",
                posts: [],
                photos: [],
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                dispatch({
                  type: `SIGN_UP`,
                  payload: {
                    uid: data.user.uid,
                    name: user.name,
                    email: user.email,
                    password: bcrypt.hashSync(user.password, 10),
                  },
                });
              });
          });
      });
  };
};

export const signIn = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
          db.collection('users')
            .doc(data.user.uid)
            .update({
              isOnline: true
            })
            .then(() => {
            dispatch({
              type: `LOGIN_SUCCESS`,
              payload: {
                uid: data.user.uid,
                name: user.name,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10),
              },
            });
          })
          .catch((err) => {
            dispatch({
              type: "LOGIN_FAILURE",
              payload: { err },
            });
          });
      });
  };
};

export const signInWithProvider = () => {
  return async (dispatch) => {
    const db = firebase.firestore();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        db.collection("users")
          .doc(data.user.uid)
          .set({
            uid: data.user.uid,
            name: data.user.displayName,
            email: "",
            password: "",
            avatar: "",
            posts: [],
            photos: [],
            createdAt: new Date(),
            isOnline: true,
          })
          .then(() => {
            dispatch({
              type: "SIGN_IN_WITH_PROVIDER",
              payload: {
                uid: data.user.uid,
                name: data.user.displayName,
                createdAt: new Date(),
              },
            });
          });
      });
  };
};

export const signOut = uid => {
  return async dispatch => {
    const db = firebase.firestore();
    db.collection('users')
      .doc(uid)
      .update({
        isOnline: false
      })
      .then(() => {
        firebase.auth()
                .signOut()
                .then(() => {
                  dispatch({
                    type: "LOGOUT_SUCCESS",
                  });
                })
      })
  }
}
