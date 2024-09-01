import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from './logo.png'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logo = () => {
  return (
    <div className="logo">
      {/* Replace 'YourLogo.png' with the path to your logo image */}
      <img src={logo} width="180px" alt="Logo" />
    </div>
  );
}

const Button = () => {
  return (
    <button className="btn btn-success">
      Create a new request
    </button>
  );
}

const UserProfile = ({ username, profileImage }) => {
  return (
    <div className="user-profile">
      {/* <img src={profileImage} alt="Profile" className="profile-img" /> */}
      <i className="fa-solid fa-user profileimage"></i>
      <span className="username">{username}</span>
    </div>
  );
}

const Notification = ({ count }) => {
  return (
    <div className="notification">
      <span className="badge">{count}</span>
      <i className="fas fa-bell"></i>
    </div>
  );
}

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Logo />
          </div>
          <div className="col-md-6">
            <Button />
          </div>
          <div className="col-md-3">
            <div className="d-flex justify-content-end align-items-center">
              <UserProfile username="John Doe" profileImage="profile.jpg" />
              <Notification count={999} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <Header />
      {/* Other components of your app */}
    </div>
  );
}

export default App;
