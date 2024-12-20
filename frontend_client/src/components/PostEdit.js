import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_PROD_API_URL;

const PostEdit = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);  // State to control the alert visibility

  // Fetch the list of posts when the component loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // When a post is selected, populate the form with its data
  const handleSelectPost = (post) => {
    console.log('Selected post:', post);
    setSelectedPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  // Handle form submission to update the post
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/posts/${selectedPost.id}`, {
        post: { title, content },
      });
      console.log('Post updated:', response.data);

      // After updating, reset form fields and selected post
      setTitle('');
      setContent('');
      setSelectedPost(null);

      // Show the success alert
      setShowAlert(true);

      // Re-fetch posts to reflect changes (refresh the post list)
      const updatedPosts = await axios.get(`${API_URL}/posts`);
      setPosts(updatedPosts.data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Close the alert after a few seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Close alert after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <Container>
      <h2>Please select which post to edit</h2>
      {/* Display success alert if post is updated */}
      {showAlert && (
        <Alert variant="success">
          Post has been successfully updated!
        </Alert>
      )}

      {/* List of posts */}
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={4} className="mb-3">
            <div
              onClick={() => handleSelectPost(post)}
              style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}
            >
              <h5>{post.title}</h5>
              <p>{post.content.slice(0, 100)}...</p>
            </div>
          </Col>
        ))}
      </Row>

      {/* If a post is selected, show the edit form */}
      {selectedPost && (
        <div>
          <h3>Edit Post: {selectedPost.title}</h3>
          <Form onSubmit={handleUpdatePost}>
            <Form.Group controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="postContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default PostEdit;
