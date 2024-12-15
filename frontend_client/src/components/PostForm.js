import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://ec2-18-232-87-216.compute-1.amazonaws.com:3000', {
        post: { title, content },
      });
      console.log('Post created:', response.data);
      // Optionally update state to reflect the new post in the UI
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Post</h2>
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
    </div>
  );
};

export default PostForm;
