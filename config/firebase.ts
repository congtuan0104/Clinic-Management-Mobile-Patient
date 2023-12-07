import firebase from "firebase/compat/app";
// export const firebaseConfig = {
//   apiKey: "AIzaSyBwljKuHPNin6ODGe4EkG8UQL4QwuL-UoM",
//   authDomain: "login-6752e.firebaseapp.com",
//   databaseURL: "https://login-6752e.firebaseio.com",
//   projectId: "login-6752e",
//   storageBucket: "login-6752e.appspot.com",
//   messagingSenderId: "931199521045",
//   appId: "1:931199521045:android:f22b9362cda32f90e0d91c",
// };

export const firebaseConfig = {
  apiKey: "AIzaSyAdsQA5DJDhLyycJX3L81IjcpRjGiJeMK4",
  authDomain: "clinus-8d987.firebaseapp.com",
  databaseURL:
    "https://clinus-8d987-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clinus-8d987",
  storageBucket: "clinus-8d987.appspot.com",
  messagingSenderId: "360103440958",
  appId: "1:360103440958:web:b554c3d1f3a452dc8fd76f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
