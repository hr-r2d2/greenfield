import React from 'react'
import { ControlLabel, Modal, Button, FormControl } from 'react-bootstrap'
import axios from 'axios'

class JoinChat extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <div>
        <Modal show={this.props.showJoinRoom} onHide={this.props.closeJoinRoom}>

          <Modal.Header closeButton>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>

          <div>
            <Modal.Body>
                <ControlLabel>Form your very own stud(y) group! Create a chat room for you and your friends to coordinate study logistics.</ControlLabel>
                {this.props.rooms.map((room, i) => {
                  return (
                    <div onClick = {() => this.props.handleSelectedRoom(room)} key={i}>
                      {room['group_name']}
                      <hr></hr>
                      {room['group_topic']}
                    </div>
                  )
                })}
              </Modal.Body>
            </div>
        </Modal>
      </div>
    )
  }
}

export default JoinChat
