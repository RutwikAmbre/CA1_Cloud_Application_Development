import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Alert, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_PROD_API_URL;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from the Rails backend API
    axios.get(`${API_URL}/posts`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        setError("Error fetching posts.");
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Posts</h2>

      {/* Display error message if there's an issue fetching posts */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Render posts in a responsive grid */}
      <Row>
        {posts.map(post => (
          <Col md={4} sm={6} xs={12} key={post.id} className="mb-4">
            <Card
              className="post-card shadow-sm border-light rounded"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(post)} // Handle card click
            >
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

      {/* Render full details of the selected post */}
      {selectedPost && (
        <Card className="mt-4 shadow-sm border-light">
          <Card.Header as="h5">Post Details</Card.Header>
          <Card.Body>
            <Card.Title>{selectedPost.title}</Card.Title>
            <Card.Text>{selectedPost.content}</Card.Text>
            <ListGroup className="list-group-flush mt-3">
              <ListGroup.Item><strong>Post ID:</strong> {selectedPost.id}</ListGroup.Item>
              <ListGroup.Item><strong>Slug:</strong> {selectedPost.slug || "N/A"}</ListGroup.Item>
              <ListGroup.Item><strong>Created At:</strong> {new Date(selectedPost.created_at).toLocaleString()}</ListGroup.Item>
              <ListGroup.Item><strong>Updated At:</strong> {new Date(selectedPost.updated_at).toLocaleString()}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default PostList;
