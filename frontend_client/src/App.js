import React, { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handlePostAdded = () => {
    setRefresh(!refresh); // Toggle refresh to re-fetch posts
  };

  return (
    <div className="App">
      {/* Main container for the app */}
      <div className="container mt-5">
        {/* Header with some Bootstrap styling */}
        <h1 className="text-center mb-4">Blog App</h1>

        {/* Post Form with Bootstrap styling */}
        <div className="row mb-4">
          <div className="col-md-8 offset-md-2">
            <PostForm onPostAdded={handlePostAdded} />
          </div>
        </div>

        {/* Post List */}
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <PostList refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


