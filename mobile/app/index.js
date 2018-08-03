import React, { Component } from 'react';
import axios from 'axios';
import Home from './components/Home/Home.component'
import Header from './components/Header/Header.component';
import Search from './components/Search/Search.component';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cafes: [],
      username: '',
      password: '',
      userId: '',
      loggedIn: false,
      showIndivCafe: false
    };

    this.handleYelp = this.handleYelp.bind(this);

    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.logout = this.logout.bind(this);
    this.handleSession = this.handleSession.bind(this);

    this.handleYelp = this.handleYelp.bind(this);
    this.renderIndivCafe = this.renderIndivCafe.bind(this);

    this.getUser = this.getUser.bind(this);
  }

  handleYelp(data) {
    this.setState({
      cafes: data
    });
  }

  handleUser(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  loginUser() {
    axios
      .post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        // response.data returns userId
        this.setState({
          loggedIn: true,
          userId: response.data.id,
          membership: response.data.membership
        });
      })
      .catch((err) => {
        console.error('Username or password is incorrect', err);

        // Alert.error('Incorrect username or password', {
        //   position: 'bottom'
        // });
      });
  }

  registerUser() {
    axios
      .post('/register', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        // response.data returns userId

        this.setState({
          loggedIn: true,
          userId: response.data
        });
        this.forceUpdate();
      })
      .catch((err) => {
        console.error('Error registering', err);
      });
  }

  logout() {
    axios.get('/logout').then(() => {
      this.setState({
        username: '',
        userId: '',
        loggedIn: false
      });
    });
  }

  handleSession(response) {
    if (!response) {
      this.setState({
        username: '',
        password: ''
      });
    } else {
      this.setState({
        username: response.data.username,
        userId: response.data.userId,
        loggedIn: response.data.login,
        membership: response.data.membership
      });
    }
  }

  renderIndivCafe(bool) {
    this.setState({
      showIndivCafe: bool
    });
  }

  async getUser(){
    let response = await axios.get('/current_user')
    this.setState({membership: response.data.membership})
  }

  componentDidMount(){
    this.getUser()
  }
  render() {
    return (
      <Home/>
    );
  }
}