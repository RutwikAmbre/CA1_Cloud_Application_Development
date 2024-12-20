import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Alert, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Container className="mt-4">
      <h2 className="mb-4">Posts</h2>

      {/* Display error message if there's an issue fetching posts */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Render posts in a responsive grid */}
      <Row>
        {posts.map(post => (
          <Col md={4} sm={6} xs={12} key={post.id} className="mb-4">
            <Card className="post-card shadow-sm border-light rounded" style={{ cursor: 'pointer' }}>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Post ID: {post.id}</ListGroup.Item>
                </ListGroup>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.content ? post.content.slice(0, 100) + "..." : "No content available"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PostList;
