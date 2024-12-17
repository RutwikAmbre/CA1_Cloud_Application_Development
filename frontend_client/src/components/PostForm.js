import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_PROD_API_URL;

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);  // To hold the list of posts

  // Fetch the list of posts when the component is first loaded
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);  // Update posts state with the fetched data
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/posts`, {
        post: { title, content },
      });
      console.log('Post created:', response.data);

      // After a successful post, refresh the post list
      setTitle('');
      setContent('');
      fetchPosts();  // Refresh the list of posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Fetch posts when the component mounts
  React.useEffect(() => {
    fetchPosts();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

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

      <div className="mt-5">
        <h3>Post List</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h5>{post.title}</h5>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostForm;
