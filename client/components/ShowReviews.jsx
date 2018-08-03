import React from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

class ShowReviews extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
    
  render() {
    // shows average reviews
    return (
      <div>
        {/* if button is clicked, modal pops up with all the reviews for that cafe */}
        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          {this.props.reviews.length} Review(s)<br />
          Click for more reviews
        </Button>
      {/* modal (popout well) */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.cafe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* maps every review on DB and shows avg star ratings for categories & review text */}
            {this.props.reviews.map((review) => {
              return (
                <div>
                  <Grid bsClass="">
                    <Row>
                      <h5 className="review-modal-user">{review.username}:</h5>
                      <Col xs={6} md={3}>
                        <strong>Coffee/Tea:</strong>{' '}
                        <StarRatings
                          numberOfStars={5}
                          rating={review.coffeeTea || 0}
                          starDimension="15px"
                          starSpacing="1px"
                          starRatedColor="gold"
                          starEmptyColor="grey"
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <strong>Atmosphere: </strong>
                        <StarRatings
                          numberOfStars={5}
                          rating={review.atmosphere || 0}
                          starDimension="15px"
                          starSpacing="1px"
                          starRatedColor="gold"
                          starEmptyColor="grey"
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <strong>Comfort:</strong>{' '}
                        <StarRatings
                          numberOfStars={5}
                          rating={review.comfort || 0}
                          starDimension="15px"
                          starSpacing="1px"
                          starRatedColor="gold"
                          starEmptyColor="grey"
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <strong>Food:</strong>{' '}
                        <StarRatings
                          numberOfStars={5}
                          rating={review.food || 0}
                          starDimension="15px"
                          starSpacing="1px"
                          starRatedColor="gold"
                          starEmptyColor="grey"
                        />
                      </Col>
                    </Row>
                  </Grid>
                  <br />
                  <p>{review.text}</p>
                  <br />
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShowReviews;
