import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import PaymentForm from './PaymentForm.jsx';
import {
  Navbar,
  NavItem,
  Nav,
  NavDropdown,
  MenuItem,
  Button,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';
import axios from 'axios';

import Profile from './Profile.jsx';
import CreateChat from './CreateChat.jsx';
import JoinChat from './JoinChat.jsx';
import Invitation from './Invitation.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showSignup: false,
      showFavorites: false,
      showCreateChat: false,
      showReviewFeed: false,
<<<<<<< HEAD
      favorites: [],
      showProfile: false, //keep false by default
=======
      showJoinRoom: false,
      favorites: [],
      showProfile: false, 
      showInvitation: false
>>>>>>> dev
    };

    this.showLogin = this.showLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);

    this.showSignup = this.showSignup.bind(this);
    this.closeSignup = this.closeSignup.bind(this);

    this.showFavorites = this.showFavorites.bind(this);
    this.closeFavorites = this.closeFavorites.bind(this);
    
    this.showCreateChat = this.showCreateChat.bind(this);
    this.closeCreateChat = this.closeCreateChat.bind(this);


    this.showJoinRoom = this.showJoinRoom.bind(this);
    this.closeJoinRoom = this.closeJoinRoom.bind(this);

    this.toggleShow = this.toggleShow.bind(this)
    this.toggleProfile = this.toggleProfile.bind(this)
<<<<<<< HEAD
=======

    this.showInvitation = this.showInvitation.bind(this);
    this.closeInvitation = this.closeInvitation.bind(this);
  }

  componentWillMount() {
    axios.get('/session').then((response) => {
      if (response.data.username) {
        // check to see if response.data exists
        // sets state of parent component

        this.props.handleSession(response);
      }
    });
>>>>>>> dev
  }

  toggleShow(){
    this.setState({show: !this.state.show})
  }


  closeLogin() {
    this.props.handleSession();

    this.setState({
      showLogin: false
    });
  }

  toggleProfile() {
    this.setState({
      showProfile: !this.state.showProfile
    });
  }

  showLogin() {
    this.setState({
      showLogin: true
    });
  }

  closeSignup() {
    this.props.handleSession();

    this.setState({
      showSignup: false
    });
  }

  showSignup() {
    this.setState({
      showSignup: true
    });
  }

  showFavorites() {
    this.setState({
      showFavorites: true
    });
  }

  closeFavorites() {
    this.setState({
      showFavorites: false
    });
  }

  showJoinRoom() {
    this.setState({
      showJoinRoom: true
    });
  }

  closeJoinRoom() {
    this.setState({
      showJoinRoom: false
    });
  }

  showCreateChat() {
    this.setState({ showCreateChat: true })
  }

  closeCreateChat() {
    this.setState({ showCreateChat: false })
  }

  showInvitation() {
    this.setState({ showInvitation: true })
  }

  closeInvitation() {
    this.setState({ showInvitation: false })
  }

  render() {
    const enabled =
      this.props.username.length > 0 && this.props.password.length > 0;

    if (this.props.loggedIn) {
      return (
        <div>
          <Navbar inverse fixedTop>
<<<<<<< HEAD
            <Navbar.Header>

              <Navbar.Brand>
                <a href="/">STUD(y)</a>
              </Navbar.Brand>
            </Navbar.Header>



            <Nav pullRight>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                  <MenuItem>Signed in as {this.props.username}</MenuItem>
                  <MenuItem onClick={this.showCreateChat}>Create/ Join STUD(y) Chat</MenuItem>
                  <MenuItem onClick={this.showFavorites}>Favorites</MenuItem>
              </NavDropdown>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                   <MenuItem onClick={this.toggleProfile}>Profile</MenuItem>
                    {
                      this.state.showProfile ?   
                    (<Profile toggleProfile={this.toggleProfile} showProfile={this.state.showProfile} userId={this.props.userId} user={this.props.username} profilePic="https://pbs.twimg.com/profile_images/702479650237366272/HyN65Fu7_400x400.jpg"/>)                
                    :
                    null             
                    }

                    {this.props.membership
                    ? <MenuItem>Manage membership</MenuItem>
                    : <MenuItem onClick={this.toggleShow}>Be a STUD</MenuItem>
                    }
                    <MenuItem onClick={this.props.showReviewFeed}>Review Feed</MenuItem>

                    <MenuItem divider />
                    <MenuItem onClick={() => {return this.props.logout()}}>Logout</MenuItem>         
              </NavDropdown>
            </Nav>
=======
              <Navbar.Header>

                <Navbar.Brand>
                  <a href="/">STUD(y)</a>
                </Navbar.Brand>
              </Navbar.Header>

              <Nav pullRight>

                  {/* CHAT DROP DOWN */}
                  <NavDropdown title="Chat" id="basic-nav-dropdown">
                      <MenuItem onClick={this.showCreateChat}>Create STUD(y) Chat</MenuItem>
                      <MenuItem onClick={this.showJoinRoom}>Join STUD(y) Chat</MenuItem>
                      <MenuItem onClick={this.showInvitation}>Pending Chat Invitations</MenuItem>
                  </NavDropdown>


                  {/* PROFILE DROP DOWN */}
                  <NavDropdown title="Profile" id="basic-nav-dropdown">
                      <MenuItem>Signed in as {this.props.username}</MenuItem>
                      <MenuItem onClick={this.showFavorites}>Favorites</MenuItem>
                  </NavDropdown>

                  {/* SETTINGS DROP DOWN */}
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                       <MenuItem onClick={this.toggleProfile}>Profile</MenuItem>
                        {
                          this.state.showProfile ?   
                        (<Profile toggleProfile={this.toggleProfile} showProfile={this.state.showProfile} userId={this.props.userId} user={this.props.username} profilePic="https://pbs.twimg.com/profile_images/702479650237366272/HyN65Fu7_400x400.jpg"/>)                
                        :
                        null             
                        }

                        {this.props.membership
                        ? <MenuItem>Manage membership</MenuItem>
                        : <MenuItem onClick={this.toggleShow}>Be a STUD</MenuItem>
                        }
                        <MenuItem onClick={this.props.showReviewFeed}>Review Feed</MenuItem>

                        <MenuItem divider />
                        <MenuItem onClick={() => {return this.props.logout()}}>Logout</MenuItem>         
                  </NavDropdown>
              </Nav>
>>>>>>> dev
          </Navbar>

          <Modal style={{}} show={this.state.show} onHide={this.toggleShow}>
            <Modal.Header style={{background: '#272727'}}closeButton>
              <Modal.Title style={{color: '#fff'}}>Be a STUD</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
              <div className="example">
                <Elements>
                  <PaymentForm toggleShow={this.toggleShow} userId={this.props.userId} getUser={this.props.getUser}/>
                </Elements>
              </div>
            </StripeProvider>
            </Modal.Body>
          </Modal>

          <CreateChat 
<<<<<<< HEAD
=======
            rooms={this.props.rooms}
>>>>>>> dev
            getGroups={this.props.getGroups}
            userId={this.props.userId} 
            showCreateChat={this.state.showCreateChat}
            closeCreateChat={this.closeCreateChat}/>

          <JoinChat 
            rooms={this.props.rooms}
            showJoinRoom={this.state.showJoinRoom}
            closeJoinRoom={this.closeJoinRoom}
            handleSelectedRoom={this.props.handleSelectedRoom}/>

          <Invitation 
            rooms={this.props.rooms}            
            showInvitation={this.state.showInvitation}
            closeInvitation={this.closeInvitation}
            getGroups={this.props.getGroups}
            invitations={this.props.invitations}
            acceptInvitation={this.props.acceptInvitation}
            rejectInvitation={this.props.rejectInvitation}/>

        </div>
      );
    } else {
      return (
        <div>
          <Navbar inverse fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="">STUD(y)</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem show="false" onClick={this.showLogin}>
                  Login
                </NavItem>
                <NavItem onClick={this.showSignup}> Register </NavItem>
              </Nav>

              <Modal show={this.state.showLogin} onHide={this.closeLogin}>
                <Modal.Body>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="username"
                      value={this.props.username}
                      onChange={(e) => {
                        this.props.handleUser(e);
                      }}
                    />
                    <FormControl
                      type="password"
                      placeholder="password"
                      value={this.props.password}
                      onChange={(e) => {
                        this.props.handlePassword(e);
                      }}
                    />
                  </FormGroup>

                  <Button
                    disabled={!enabled}
                    type="submit"
                    onClick={this.props.loginUser}
                  >
                    Log In
                  </Button>
                </Modal.Body>
              </Modal>

              <Modal show={this.state.showSignup} onHide={this.closeSignup}>
                <Modal.Body>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="username"
                      value={this.props.username}
                      onChange={(e) => {
                        this.props.handleUser(e);
                      }}
                    />
                    <FormControl
                      type="password"
                      placeholder="password"
                      value={this.props.password}
                      onChange={(e) => {
                        this.props.handlePassword(e);
                      }}
                    />
                  </FormGroup>

                  <Button
                    disabled={!enabled}
                    type="submit"
                    value="Submit"
                    onClick={this.props.registerUser}
                  >
                    Register
                  </Button>
                </Modal.Body>
              </Modal>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    }
  }
}

export default Header;
