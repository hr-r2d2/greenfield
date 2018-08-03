import React from 'react';
import { ControlLabel, Modal, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';

class CreateChat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      group_name: '', 
      group_thumbnail: '', 
      group_topic: ''
    };
    this.createChat = this.createChat.bind(this);
  }

  createChat() {
    let data = { user_id: this.props.user_id, group_name: this.state.group_name,  group_thumbnail: this.state.group_thumbnail, group_topic: this.state.group_topic }
    axios.post('/groups', data)
    .then((res) => {
      console.log('Saved Data')
      this.props.getGroups()
    })
    .catch((err) => console.log('Error saving group ', err))
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showCreateChat} onHide={this.props.closeCreateChat}>

          <Modal.Header closeButton>
            <Modal.Title>Create Chat</Modal.Title>
          </Modal.Header>

          <div>
            <Modal.Body>
            <ControlLabel>Create a private stud(y) chat for your group.</ControlLabel>
            <FormControl
              type="text"
              name="group_name"
              placeholder="Stud(y) Name"
              value={this.state.group_name}
              onChange={(e) => {this.handleChange(e)}}
            />
            <FormControl
              type="text"
              name="group_thumbnail"
              placeholder="Stud(y) Thumbnail"
              value={this.state.group_thumbnail}
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
        </Modal>
      </div>
    );
  }
}

export default CreateChat;
// change button color  FormControl
// send invitation to friend
// join chat 