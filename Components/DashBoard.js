import React, { useState } from 'react';
import TextBox from './TextBox';
import CommentBox from './CommentBox';
import MeetingNotes from './MeetingNotes';
import SharedWith from './SharedWith'; 

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleTextBoxSubmit = (text) => {
    setNotes([...notes, { type: 'text', content: { text, name, avatar } }]);
  };

  const handleCommentBoxSubmit = (comment) => {
    setNotes([...notes, { type: 'comment', content: comment }]);
  };

  return (
    <div className="dashboard">
      <div className="left-panel">
        <TextBox onSubmit={handleTextBoxSubmit} name={name} avatar={avatar} />
        <SharedWith /> 
      </div>
      <div className="right-panel">
      <h1>Meeting Stream</h1>

        <div className="meeting-notes-container">

          <MeetingNotes notes={notes} />
        </div>
        <div className="comment-box-container">
        <CommentBox
          onSubmit={handleCommentBoxSubmit}
          setAvatar={setAvatar}
          setName={setName}
          name={name} 
          avatar={avatar} 
        />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;