import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import 'react-quill/dist/quill.snow.css';

const firebaseConfig = {
  apiKey: "AIzaSyCBEfvB8YjDAN7bhkUrqKvM7c1OICR1BaA",
  authDomain: "meetly-ec367.firebaseapp.com",
  projectId: "meetly-ec367",
  storageBucket: "meetly-ec367.appspot.com",
  messagingSenderId: "182780979371",
  appId: "1:182780979371:web:c5d5f79d2aeb3273f1efee"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app); 

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const TextBox = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'user_notes', 'myNote'), (doc) => {
      if (doc.exists()) {
        setValue(doc.data().note);
      }
    });
    return () => unsub();
  }, []);

  const handleChange = async (content) => {
    setValue(content);
    await setDoc(doc(db, 'user_notes', 'myNote'), { note: content });
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  return (
    <div>
      <ReactQuill
        className="myQuill"
        value={value}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default TextBox;
