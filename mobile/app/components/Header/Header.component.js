import React from 'react';
import axios from 'axios';
import { Header as NavBar } from 'react-native-elements';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showSignup: false,
      showFavorites: false,
      showCreateChat: false,
      favorites: []
    };
  }


  render() {
    return (
      <NavBar
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'STUD(y)', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    );
  }
}

export default Header;
