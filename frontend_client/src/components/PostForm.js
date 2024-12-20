import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Alert } from 'react-bootstrap';

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_PROD_API_URL;

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Close the alert after a few seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Close alert after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (title.length >= 20) {
      setShowAlert(true);  // Show alert
      setAlertMessage("Title can't be more than 20 characters.");
      return;
    }

    if (content.length < 20) {
      setShowAlert(true);  // Show alert
      setAlertMessage("Content must be at least 20 characters.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/posts`, {
        post: { title, content },
      });

      setShowAlert(true);  // Show alert
      setAlertMessage("Post was successfully created.");

      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create a New Post</h2>
      {showAlert && (
        <Alert variant={alertMessage.includes("successfully") ? "success" : "danger"}>
          {alertMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
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
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Post
        </Button>
      </Form>
    </Container>
  );
};

export default PostForm;
