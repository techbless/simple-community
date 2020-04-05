import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home, NewPost } from './pages';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/newpost" component={NewPost} />
    </Router>
  );
}

export default App;
