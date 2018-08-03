import React from 'react';
import { Thumbnail, Modal } from 'react-bootstrap';
import StackGrid from 'react-stack-grid';

import axios from 'axios';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: []
    };
  }

  modalBody() {
    if (this.state.favorites.length) {
      return (
        <div className='favorites'>
              {this.state.favorites.map((cafe) => {
                return (
                  <div >
                      <h4>{cafe.name}</h4>
                      <p>
                        {cafe.address}, {cafe.city}, {cafe.state}
                      </p>
                  </div>
                );
              })}
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Body>No favorites to show.</Modal.Body>
        </div>
      );
    }
  }

  componentWillMount() {
    axios
      .get('/favorites', {
        params: {
          user_id: this.props.userId
        }
      })
      .then((response) => {
        this.setState({
          favorites: response.data
        });
      })
      .catch((err) => {
        console.error('Error getting favorites', err);
      });
  }

  render() {
    return this.modalBody();
  }
}

export default Favorites;
