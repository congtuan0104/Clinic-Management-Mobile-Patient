import firebase from "firebase/compat/app";

// export const firebaseConfig = {
//   apiKey: "AIzaSyAdsQA5DJDhLyycJX3L81IjcpRjGiJeMK4",
//   authDomain: "clinus-8d987.firebaseapp.com",
//   databaseURL:
//     "https://clinus-8d987-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "clinus-8d987",
//   storageBucket: "clinus-8d987.appspot.com",
//   messagingSenderId: "360103440958",
//   appId: "1:360103440958:web:b554c3d1f3a452dc8fd76f",
// };

export const firebaseConfig = {
  apiKey: "AIzaSyDeKmt3vXGRZBhDIFjHG_sfCrsQP_3dQxk",
  authDomain: "clinus-67efd.firebaseapp.com",
  databaseURL: "https://clinus-67efd-default-rtdb.firebaseio.com",
  projectId: "clinus-67efd",
  storageBucket: "clinus-67efd.appspot.com",
  messagingSenderId: "416278606380",
  appId: "1:416278606380:web:460ee8ebebcce94fab1789",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
