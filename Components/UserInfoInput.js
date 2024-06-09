import React, { useState } from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 
import { initializeApp } from 'firebase/app'; 
// Initialize Firebase
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

const UserInfoInput = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (name.trim()) {
      onSubmit(name, avatar); 
  
      const defaultAvatar = "https://cdn.msisurfaces.com/images/colornames/gradient/absolute-black-granite.jpg";
  
      try {
        const docRef = await addDoc(collection(db, 'user_data'), {
          name: name,
          avatar: avatar || defaultAvatar 
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert('Please enter your name to start the discussion.');
    }
  };
  return (
    <div className="user-info">
      <div className="sign-up-instructions">
        Sign up to start the discussion
      </div>
      <div className="input-group">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your Name"
        />
        <FaUser />
      </div>
      <div className="input-group file-input-wrapper">
        <label htmlFor="file-input" className="file-input-label">
          Profile Pic (Optional)
        </label>
        <input
          type="file"
          id="file-input"
          onChange={handleAvatarChange}
          className="file-input"
          accept="image/*"
        />
        <FaCamera />
      </div>
      {avatar && <img src={avatar} alt="avatar" className="avatar-preview" />}
      <button onClick={handleSubmit} className="submit-button">
        Start Discussion
      </button>
    </div>
  );
};

export default UserInfoInput;
