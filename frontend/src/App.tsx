import React from 'react';
import './styles/App.css';
import Header from './component/Header';
import ArticleCard from './component/ArticleCard';

function App() {
  return (
    <div className="App">
      <Header />
      
      <ArticleCard title="Hello React" createdAt="2020-04-03 02:34:21"/>
    </div>
  );
}

export default App;
