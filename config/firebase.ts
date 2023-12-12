import firebase from "firebase/compat/app";

// export const firebaseConfig = {
//   apiKey: "AIzaSyDeKmt3vXGRZBhDIFjHG_sfCrsQP_3dQxk",
//   authDomain: "clinus-67efd.firebaseapp.com",
//   databaseURL: "https://clinus-67efd-default-rtdb.firebaseio.com",
//   projectId: "clinus-67efd",
//   storageBucket: "clinus-67efd.appspot.com",
//   messagingSenderId: "416278606380",
//   appId: "1:416278606380:web:460ee8ebebcce94fab1789",
// };

export const firebaseConfig = {
  apiKey: "AIzaSyBUjR_LpKzbeLaBANVXDN84BDLPLRn6VhM",
  authDomain: "clinus-1d1d1.firebaseapp.com",
  databaseURL:
    "https://clinus-1d1d1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clinus-1d1d1",
  storageBucket: "clinus-1d1d1.appspot.com",
  messagingSenderId: "698964272341",
  appId: "1:698964272341:web:f8e27c1489c69dbf6cee5c",
  measurementId: "G-13Z9189280",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
