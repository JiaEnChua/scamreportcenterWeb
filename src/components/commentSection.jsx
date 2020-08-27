import React, { Component } from "react";
import "./post.css";
import Ratings from "react-ratings-declarative";

class CommentSection extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="comment-section">
          <div className="comment-title">
            <h2>Review Section</h2>
          </div>
          {this.props.comments.map((comment) => (
            <div key={comment._id}>
              <div className="author">
                <div className="inline">
                  <p>{comment.author}:</p>
                </div>
                <div className="inline">
                  <Ratings rating={comment.rating} widgetRatedColors="yellow">
                    <Ratings.Widget widgetDimension="30px" />
                    <Ratings.Widget widgetDimension="30px" />
                    <Ratings.Widget widgetDimension="30px" />
                    <Ratings.Widget widgetDimension="30px" />
                    <Ratings.Widget widgetDimension="30px" />
                  </Ratings>
                </div>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CommentSection;
