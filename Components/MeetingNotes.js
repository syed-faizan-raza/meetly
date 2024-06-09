import React from 'react';

const MeetingNotes = ({ notes }) => {
  return (
    <div className="meeting-notes">
      {notes.map((note, index) => (
        <div key={index} className="note" style={{ backgroundColor: '#f0f8ff' }}>
          <div className="comment-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {note.content.avatar ? (
                <img src={note.content.avatar} alt="avatar" className="avatar" />
              ) : (
                <div className="default-avatar">G</div>
              )}
              <strong>{note.content.name}</strong>
            </div>
            <span className="timestamp">
              {new Date(note.content.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: note.content.text }} />
          {note.content.attachment && (
            <div>
              <a href={URL.createObjectURL(note.content.attachment)} target="_blank" rel="noopener noreferrer">
                {note.content.attachment.name}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MeetingNotes;