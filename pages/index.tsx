import React from 'react';
import DashBoard from '../Components/DashBoard';
import Header from '../Components/Header'

const Home: React.FC = () => {
  return (
    <div className="container">
      <Header /> 
      <DashBoard />
    </div>
  );
};

export default Home;