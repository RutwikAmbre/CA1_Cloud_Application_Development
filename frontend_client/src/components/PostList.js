import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Alert } from 'react-bootstrap';

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_PROD_API_URL;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from the Rails backend API
    axios.get(`${API_URL}/posts`)  // Specify the full API URL with the correct port
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        setError("Error fetching posts.");
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.content ? post.content.slice(0, 100) + "..." : "No content available"}
                </Card.Text>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Post ID: {post.id}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
