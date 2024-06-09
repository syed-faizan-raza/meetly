import React, { useState } from 'react';
import { IoSendOutline } from "react-icons/io5";
import UserInfoInput from './UserInfoInput'; 

const CommentBox = ({ onSubmit, name, avatar, setName, setAvatar }) => {
  const [comment, setComment] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        text: comment,
        name: name || 'Guest',
        avatar,
        timestamp: new Date(),
      };
      onSubmit(newComment);
      setComment('');
    }
  };
  const handleSignUp = (name, avatar) => {
    setName(name);
    setAvatar(avatar);
    setSignedUp(true);
  };
  
  return (
    <div className="comment-box">
      {!signedUp ? (
        <UserInfoInput setName={setName} setAvatar={setAvatar} onSubmit={handleSignUp} />
      ) : (
        <form onSubmit={handleCommentSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Type your message..."
            />
            <button type="submit" className="send-button">
              <IoSendOutline />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentBox;