import React, { useEffect, useState } from 'react';
import AxiosInstance from './Axios';
import { useParams } from 'react-router-dom';

const ThreadDetails = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch thread details
    AxiosInstance.get(`http://127.0.0.1:8000/thread/${id}/`).then((res) => {
      setThread(res.data);
    });

    // Fetch comments for the thread
    AxiosInstance.get(`http://127.0.0.1:8000/comment/?thread=${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const handleCommentSubmit = () => {
    // Add the comment to the backend
    AxiosInstance.post(`http://127.0.0.1:8000/comment/`, { content: comment, thread: id })
      .then((res) => {
        
        AxiosInstance.get(`http://127.0.0.1:8000/comment/?thread=${id}`).then((res) => {
          setComments(res.data);
        });
      })
      .catch((error) => {
        console.error('Error submitting comment:', error);
      });

    
    setComment('');
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      {thread ? (
        <div>
          <h2>{thread.title}</h2>
          <p>{thread.content}</p>

          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {comments.map((c) => (
                <li key={c.id}>
                  <div style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <strong>{c.content}</strong>
                    <br />
                    {new Date(c.created).toLocaleString()} {/* Show the date and time */}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add Comment
          </button>
        </div>
      ) : (
        <p>Loading thread details...</p>
      )}
    </div>
  );
};

export default ThreadDetails;
