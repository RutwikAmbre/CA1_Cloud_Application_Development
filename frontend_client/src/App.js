import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';  // Added Row, Col, Button imports
import PostForm from './components/PostForm';  // Correct path for PostForm
import PostList from './components/PostList';  // Correct path for PostList
import PostEdit from './components/PostEdit';  // Correct path for PostEdit
import PostDelete from './components/PostDelete';  // Correct path for PostDelete
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Import the CSS file for styles


const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">BlogApp</Navbar.Brand> {/* Home link */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {/* Create Post Link */}
                <Nav.Link as={Link} to="/create-post">Create Post</Nav.Link>

                {/* Always display Show, Edit, Delete Links */}
                <Nav.Link as={Link} to="/show-posts">Show Posts</Nav.Link>
                <Nav.Link as={Link} to="/edit-post">Edit Post</Nav.Link>
                <Nav.Link as={Link} to="/delete-post">Delete Post</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          {/* Home route (only show the welcome container on this route) */}
          <Route path="/" element={
            <Container className="text-center mt-5">
              <Row>
                <Col md={12}>
                  <h1 className="display-4 mb-4">Welcome to the Post Management System</h1>
                  <p className="lead mb-4">
                    Manage and edit your posts easily with a simple and intuitive interface.
                  </p>
                  <Button variant="primary" size="lg" as={Link} to="/posts">
                    View Posts
                  </Button>
                </Col>
              </Row>
            </Container>
          } />

          {/* Other routes (no welcome container here) */}
          <Route path="/posts" element={<PostList />} />
          <Route path="/create-post" element={<PostForm />} />
          <Route path="/edit-post" element={<PostEdit />} />
          <Route path="/show-posts" element={<PostList />} />
          <Route path="/delete-post" element={<PostDelete />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
