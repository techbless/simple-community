import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, NewPost, Login, Article, Register } from './pages';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/newpost" component={NewPost} />
      <Route path="/article/:articleId" component={Article} />
    </Router>
  );
}

export default App;
