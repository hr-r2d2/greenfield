import React from 'react';
import { ControlLabel, Modal, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';

class CreateChat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      group_id: '',
      group_name: '', 
      group_topic: '', 
      viewInviteFriends: false, 
      currFriend: '',
      friends: []
    };
    this.createChat = this.createChat.bind(this);
    this.addToFriends = this.addToFriends.bind(this);
    this.sendInvites = this.sendInvites.bind(this);
    this.deleteName = this.deleteName.bind(this);
  }

  createChat() {
    let data = { creator_id: this.props.userId, group_name: this.state.group_name, group_topic: this.state.group_topic }
    axios.post('/groups', data)
    .then((res) => {
      this.props.getGroups();
      this.setState({group_id: res.data['chatgroups_id'], group_name: '', group_topic: '', viewInviteFriends: !this.state.viewInviteFriends})
    })
    .catch((err) => console.log('Error saving group ', err))
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  addToFriends() {
    let newFriends = this.state.friends.slice()
    newFriends.push(this.state.currFriend)
    this.setState({friends: newFriends, currFriend: ''})
  }

  deleteName(i) {
    let newFriends = this.state.friends.slice()
    newFriends.splice(i, 1)
    this.setState({friends: newFriends})
  }

  sendInvites() {
    axios.post('/group-invitation', {usersNameArray: this.state.friends, chatgroups_id: this.state.group_id})
    .then((res) => console.log('Invations send', res))
    .catch((err) => console.log('Error sending invites ', err))
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showCreateChat} onHide={this.props.closeCreateChat}>

          <Modal.Header closeButton>
            <Modal.Title>Study(y) Chat Room</Modal.Title>
          </Modal.Header>

          <div>
          {
            this.state.viewInviteFriends === false ? (
              <div>
                <Modal.Body>
                    <ControlLabel>Form your very own stud(y) group! Create a chat room for you and your friends to coordinate study logistics.</ControlLabel>
                    <FormControl
                      type="text"
                      name="group_name"
                      placeholder="Stud(y) Name"
                      value={this.state.group_name}
                      onChange={(e) => {this.handleChange(e)}}
                    />
                    <FormControl
                      type="text"
                      name="group_topic"
                      placeholder="Stud(y) Topic"
                      value={this.state.group_topic}
                      onChange={(e) => {this.handleChange(e)}}
                    />
                </Modal.Body>
                <Modal.Footer>
                  <Button>Close</Button>
                  <Button type="submit"
                          value="Submit"
                          onClick={(e) => {this.createChat(e)}}>Create Group</Button>
                </Modal.Footer>
            </div>
              ) : (
             <div>
              <Modal.Body>
                  <ControlLabel>Now Invite your Friends</ControlLabel>
                    {    
                      this.state.friends.length === 0 ? (
                        <div>0 Friends Added</div>
                        ) : (
                        <div><ul>
                          {
                            this.state.friends.map((friend, i) => {
                              return (
                                <li onClick={() => {this.deleteName(i)}} key={i}>{friend}</li>
                                )
                            })}
                        </ul></div>
                        )
                    }
                  <FormControl
                    type="text"
                    name="currFriend"
                    placeholder="Stud(y) Name"
                    value={this.state.currFriend}
                    onChange={(e) => {this.handleChange(e)}}
                  />

              </Modal.Body>
              <Modal.Footer>
                  <Button type="submit"
                          value="Submit"
                          onClick={(e) => {this.addToFriends(e)}}>Add To Group</Button>
                  <Button type="submit"
                          value="Submit"
                          onClick={(e) => {this.sendInvites(e)}}>DONE: Send Invites</Button>
                </Modal.Footer>
              </div>
              )
          }
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateChat;
// change button color  FormControl
// send invitation to friend
// join chat 