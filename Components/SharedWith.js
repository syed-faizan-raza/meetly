import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'; 
import { initializeApp } from 'firebase/app'; 

const firebaseConfig = {
  apiKey: "AIzaSyCBEfvB8YjDAN7bhkUrqKvM7c1OICR1BaA",
  authDomain: "meetly-ec367.firebaseapp.com",
  projectId: "meetly-ec367",
  storageBucket: "meetly-ec367.appspot.com",
  messagingSenderId: "182780979371",
  appId: "1:182780979371:web:c5d5f79d2aeb3273f1efee"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

const SharedWith = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'user_data'), (snapshot) => {
      const usersList = snapshot.docs.map(doc => doc.data());
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="shared-with">
        <p>shared with</p>
      {users.map((user, index) => (
        <div key={index} className="user">
          
          <img src={user.avatar} alt="avatar" className="avatar" />
          <div className="name">{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default SharedWith;