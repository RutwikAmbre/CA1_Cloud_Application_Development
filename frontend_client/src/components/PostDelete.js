import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_PROD_API_URL;

const PostDelete = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAlert, setShowAlert] = useState(false);  // State to control the alert visibility
  const [alertMessage, setAlertMessage] = useState('');

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

  // Handle post selection
  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  // Handle delete post
  const handleDeletePost = async (e) => {
    e.preventDefault(); // Prevent form submission (if it's inside a form)
    try {
      // Delete the selected post
      const response = await axios.delete(`${API_URL}/posts/${selectedPost.id}`);
      console.log('Post deleted:', response.data); // Log the response
  
      // Show success alert
      setAlertMessage('Post has been successfully deleted!');
      setShowAlert(true);
  
      // Clear selected post
      setSelectedPost(null);
  
      // Re-fetch posts to reflect the changes
      const updatedPosts = await axios.get(`${API_URL}/posts`);
      setPosts(updatedPosts.data);

      console.log('Post with ID ' + selectedPost.id + ' has been deleted successfully.');
  
    } catch (error) {
      console.error('Error deleting post:', error);
      setAlertMessage('Failed to delete the post.');
      setShowAlert(true);
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
      <h2 className="my-4">Please select which post to delete</h2>

      {/* Display success or error alert */}
      {showAlert && (
        <Alert variant="success">
          {alertMessage}
        </Alert>
      )}

      {/* List of posts with enhanced card design */}
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Card 
              style={{ cursor: 'pointer' }} 
              className="post-card shadow-sm border-light rounded"
              onClick={() => handleSelectPost(post)}
            >
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content.slice(0, 100)}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* If a post is selected, show the delete confirmation */}
      {selectedPost && (
        <div>
          <h3>Are you sure you want to delete this post?</h3>
          <p><strong>Title:</strong> {selectedPost.title}</p>
          <p><strong>Content:</strong> {selectedPost.content}</p>
          <Button variant="danger" onClick={handleDeletePost}>Delete Post</Button>
        </div>
      )}
    </Container>
  );
};

export default PostDelete;
