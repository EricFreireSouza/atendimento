import { firebaseDatabase, firebaseAuth } from '../utils/firebaseUtils';

export default class FirebaseService {
  static getDataList = (nodePath, callback) => {
    const query = firebaseDatabase.ref(nodePath);
    query.on('value', dataSnapshot => {
      const items = [];
      dataSnapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        item['key'] = childSnapshot.key;
        items.push(item);
      });
      callback(items);
    });

    return query;
  };

  static pushData = (node, objToSubmit) => {
    const ref = firebaseDatabase.ref(node).push();
    const id = firebaseDatabase.ref(node).push().key;
    ref.set(objToSubmit);
    return id;
  };

  static remove = (id, node) => {
    return firebaseDatabase.ref(node + '/' + id).remove();
  };

  static getUniqueDataBy = (node, id, callback) => {
    const ref = firebaseDatabase.ref(node + '/' + id);
    const newData = {};
    ref
      .once('value', dataSnapshot => {
        if (
          !dataSnapshot ||
          dataSnapshot === undefined ||
          !dataSnapshot.val() ||
          dataSnapshot.val() === undefined
        ) {
          callback(null);
          return;
        }

        const snap = dataSnapshot.val();
        const keys = Object.keys(snap);
        keys.forEach(key => {
          newData[key] = snap[key];
        });
      })
      .then(() => {
        callback(newData);
      });
  };

  static updateData = (id, node, obj) => {
    return firebaseDatabase.ref(node + '/' + id).set({ ...obj });
  };

  static createUser = (email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  };

  static login = (email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  };

  static logout = () => {
    return firebaseAuth.signOut();
  };

  static onAuthChange = (callbackLogin, callbackLogout) => {
    firebaseAuth.onAuthStateChanged(authUser => {
      if (!authUser) {
        callbackLogout(authUser);
      } else {
        callbackLogin(authUser);
      }
    });
  };
}
