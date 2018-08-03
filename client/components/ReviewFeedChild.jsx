import React from 'react';
import ReactTooltip from 'react-tooltip';

const ReviewFeedChild = (props) => {
  let membershipStatus = props.comment.membership > 0 ? <span className="horse" data-tip data-for={`"${props.comment.id}"`} role="img" aria-label="stud">🐎</span> : null;


  return (
    <div className="child-comment">
      <h5> {membershipStatus} {props.comment.username}:</h5>
      <ReactTooltip id={`"${props.comment.id}"`} type="error">
          <p>{props.comment.username} is a STUD..<br/>check the settings menu for details on becoming a STUD</p>
        </ReactTooltip>
      <p> {props.comment.text}</p>
    </div>
  )
};

export default ReviewFeedChild;

