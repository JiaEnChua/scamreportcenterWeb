import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./post.css";

class Post extends Component {
  state = {
    post: null,
    author: "",
    text: "",
    percentage: 0,
  };

  getSinglePost = () => {
    fetch("http://localhost:8000/reviews/" + this.props.match.params.id)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.scanWebsite();
        this.setState({ post: data });
      });
  };
  componentWillMount() {
    this.getSinglePost();
  }
  scanWebsite = () => {
    this.setState({ percentage: 10 });
  };
  renderPost = () => {
    const { percentage } = this.state;

    if (this.state.post === null) {
      return <p>There are no post!</p>;
    } else {
      return (
        <div>
          <h1>{this.state.post.title}</h1>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathTransitionDuration: 0.2,
              textSize: "12px",
            })}
          />
          {this.state.post.comments.map((comment) => (
            <p key={comment._id}>
              {comment.author}: {comment.text}
            </p>
          ))}
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
          <form onSubmit={this.submitHandler}>
            <label>Author: </label>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.changeHandler}
            />
            <label>Comment: </label>
            <input
              type="text"
              name="text"
              value={this.state.text}
              onChange={this.changeHandler}
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Add Comment
            </button>
          </form>
          <Link to="/posts">
            <button className="btn btn-secondary">Go Back All Posts</button>
          </Link>
          <br />
          <Link to="/">
            <button className="btn btn-primary">Go Back Homepage</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Post;
