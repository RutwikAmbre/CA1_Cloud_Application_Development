import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PostForm from './components/PostForm';  // Correct path for PostForm
import PostList from './components/PostList';  // Correct path for PostList
import PostEdit from './components/PostEdit';  // Correct path for PostList
import PostDelete from './components/PostDelete';  // Correct path for PostList
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/posts">BlogApp</Navbar.Brand> {/* Home link */}
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
          {/* Home route that shows all posts */}
          <Route path="/posts" element={<PostList />} />
          
          {/* Create post form */}
          <Route path="/create-post" element={<PostForm />} />

          {/* Edit post form */}
          <Route path="/edit-post" element={<PostEdit />} />

          {/* Show posts */}
          <Route path="/show-posts" element={<PostList />} />

          {/* Handle Delete (for simplicity, just display the action for now) */}
          <Route path="/delete-post" element={<PostDelete />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
