import React from 'react';
import axios from 'axios';
import ReviewFeedChild from './ReviewFeedChild.jsx';
import StarRatings from 'react-star-ratings';
import ReactTooltip from 'react-tooltip';

class ReviewFeedParent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasChildren: false,
      children: [],
      showCommentForm: false,
      commentValue: '',
      commentCharsRemain: 255
    }
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.checkForChildren = this.checkForChildren.bind(this);
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    if (this.props.currentUserId === '') {
      alert('you must log in to comment');
      this.handleCommentClick();
    } else {
      axios.post('/subComment', {
        parentId: this.props.review.id,
        location: this.props.review.location,
        userId: this.props.currentUserId,
        text: this.state.commentValue
      })
        .then((response) => {
          this.handleCommentClick()
          this.checkForChildren()
        })
        .catch((err) => {
          console.error('there was an error submitting your comment', err)
        })

    }
  }

  handleCommentChange(event) {
    this.setState({
      commentValue: event.target.value,
      commentCharsRemain: 255 - event.target.value.length
    })

  }

  handleCommentClick() {
    this.setState({
      showCommentForm: !this.state.showCommentForm,
      commentValue: '',
      commentCharsRemain: 255
    })
  }
  checkForChildren() {
    axios.get('/reviewsByParentId', {
      params: {
        parentId: this.props.review.id
    }})
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            children: response.data,
            hasChildren: true
          })
        }
      })
      .catch((err) => {
        console.error('there was an error fetching the child comments', err)
      })
  }
  componentDidMount() {
    // this.intervalFetchChildren = setInterval(() => this.checkForChildren(), 2000);
    this.checkForChildren();
  }

  render() {

    let membershipStatus = this.props.review.membership > 0 ? <span className="horse" data-tip data-for={`"${this.props.review.id}"`} role="img" aria-label="stud">🐎</span> : null;
    let children = null;

    if (this.state.hasChildren) {
      children = this.state.children.map((child) => (
        <ReviewFeedChild key={child.id} comment={child} />
      ))
    }

    let comment = this.state.showCommentForm ? 
                  <form onSubmit={this.handleCommentSubmit}>
                    <p>Characters left: {this.state.commentCharsRemain}</p>
                    <textarea className="comment-text-field" type="text" value={this.state.commentValue} onChange={this.handleCommentChange}/>
                    <div></div>
                    <input className="review-feed-btn" type="submit" value="Submit" />
                    <button className="review-feed-btn" onClick={this.handleCommentClick}>Cancel</button>
                  </form> : 
                  <button className="parent-comment-btn" onClick={this.handleCommentClick}>Comment</button>


    return (
    <div className="parent-comment">
      <div>
        <h5 className="parent-comment-heading">
          {this.props.review.name} <small>{this.props.review.address} {this.props.review.city}, {this.props.review.state}</small>
        </h5>
        Coffee/Tea:
        <StarRatings
          numberOfStars={5}
          rating={this.props.review.coffeeTea || 0}
          starDimension="16px"
          starSpacing="1px"
          starRatedColor="gold"
          starEmptyColor="grey"
          starHoverColor="gold"
        />
        Atmosphere:
        <StarRatings
          numberOfStars={5}
          rating={this.props.review.atmosphere || 0}
          starDimension="16px"
          starSpacing="1px"
          starRatedColor="gold"
          starEmptyColor="grey"
          starHoverColor="gold"
        />
        Comfort:
        <StarRatings
          numberOfStars={5}
          rating={this.props.review.comfort || 0}
          starDimension="16px"
          starSpacing="1px"
          starRatedColor="gold"
          starEmptyColor="grey"
          starHoverColor="gold"
        />
        Food:
        <StarRatings
          numberOfStars={5}
          rating={this.props.review.food || 0}
          starDimension="16px"
          starSpacing="1px"
          starRatedColor="gold"
          starEmptyColor="grey"
          starHoverColor="gold"
        />
      </div>
      <div className="parent-comment-spacing"></div>
      <div className="parent-comment-text">
        <h5>{membershipStatus} {this.props.review.username}:</h5>
        <ReactTooltip id={`"${this.props.review.id}"`} type="error">
          <p>{this.props.review.username} is a STUD..<br/>check the settings menu for details on becoming a STUD</p>
        </ReactTooltip>
        <p>{this.props.review.text}</p>
      </div>
      <div className="parent-comment-spacing"></div>
        {children}
        {comment}
    </div>

    )
  }
}

export default ReviewFeedParent;