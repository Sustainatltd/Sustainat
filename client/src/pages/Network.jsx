import React, { useState } from 'react';

// A small Social Network Wall with posts and comments
function Network() {
  // 🧠 State for posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // 🧠 Handler to submit new post
  const handlePostSubmit = () => {
    if (newPost.trim() === '') return;

    // Create new post object
    const post = {
      id: Date.now(),
      content: newPost,
      comments: [],
      newComment: ''
    };

    // Add to post list
    setPosts([post, ...posts]);
    setNewPost('');
  };

  // 🧠 Add a comment to a specific post
  const handleAddComment = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId && post.newComment.trim() !== ''
          ? {
              ...post,
              comments: [...post.comments, post.newComment],
              newComment: ''
            }
          : post
      )
    );
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'green', marginBottom: '20px' }}>🌿 Sustainat Network Feed</h1>

      {/* New Post Input */}
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={3}
          placeholder="Write something to share with the community..."
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={handlePostSubmit}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '8px 20px',
            border: 'none',
            borderRadius: '5px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
        >
          Post
        </button>
      </div>

      {/* Posts Display Section */}
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px',
            backgroundColor: '#f5fff5'
          }}
        >
          <p>{post.content}</p>

          {/* Comments */}
          <div style={{ marginTop: '10px' }}>
            <strong>Comments:</strong>
            {post.comments.map((comment, idx) => (
              <p key={idx} style={{ margin: '5px 0 0 10px' }}>💬 {comment}</p>
            ))}
          </div>

          {/* Add Comment Input */}
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              value={post.newComment || ''}
              onChange={(e) =>
                setPosts(posts.map(p =>
                  p.id === post.id ? { ...p, newComment: e.target.value } : p
                ))
              }
              placeholder="Add a comment..."
              style={{ padding: '5px', width: '80%', borderRadius: '5px' }}
            />
            <button
              onClick={() => handleAddComment(post.id)}
              style={{
                marginLeft: '10px',
                backgroundColor: 'green',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Network;
