import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./post.css";
import Ratings from "react-ratings-declarative";

class Post extends Component {
  state = {
    post: null,
    author: "",
    text: "",
    rating: 0,
  };
  getSinglePost = () => {
    fetch("http://localhost:8000/reviews/" + this.props.match.params.id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ post: data });
      });
  };
  componentWillMount() {
    this.getSinglePost();
  }
  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };
  renderPost = () => {
    if (this.state.post === null) {
      return <p>There are no post!</p>;
    } else {
      return (
        <div>
          <h1>{this.state.post.title}</h1>
          <div className="progressbar">
            <div className="progressbar-pic">
              <CircularProgressbar
                value={this.state.post.score}
                text={`${this.state.post.score}%`}
                styles={buildStyles({
                  pathTransitionDuration: 0.2,
                  textSize: "12px",
                })}
              />
            </div>
          </div>
          <div className="comment-section">
            <div className="comment-title">
              <h2>Review Section</h2>
            </div>
            {this.state.post.comments.map((comment) => (
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
  };
  changeHandler = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };
  submitHandler = (event) => {
    event.preventDefault(); //Prevent page refresh
    axios
      .post("http://localhost:8000/reviews/" + this.props.match.params.id, {
        text: this.state.text,
        author: this.state.author,
        rating: this.state.rating,
      })
      .then((res) => {
        // console.log(res.data);
        this.getSinglePost();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="wrapper">
        <div>
          {this.renderPost()}
          <div className="input-section">
            <form onSubmit={this.submitHandler}>
              <div className="authortextstar">
                <div className="inline">
                  <label>User: </label>
                  <div className="authorBox">
                    <input
                      style={{
                        width: 300,
                      }}
                      type="text"
                      name="author"
                      value={this.state.author}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="inline">
                  <label>Comment: </label>
                  <div className="commentBox">
                    <textarea
                      style={{
                        height: 200,
                        width: 400,
                      }}
                      type="text"
                      name="text"
                      value={this.state.text}
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="inline">
                  <Ratings
                    rating={this.state.rating}
                    widgetRatedColors="yellow"
                    changeRating={this.changeRating}
                  >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                  </Ratings>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
