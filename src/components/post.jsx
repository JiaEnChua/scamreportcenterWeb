import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Post extends Component {
  state = {
    post: null,
    author: "",
    text: "",
  };

  getSinglePost = () => {
    fetch("http://localhost:8000/reviews/" + this.props.match.params.id)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({ post: data });
      });
  };

  componentWillMount() {
    this.getSinglePost();
  }

  renderPost = () => {
    if (this.state.post === null) {
      return <p>There are no post!</p>;
    } else {
      return (
        <div>
          <h1>{this.state.post.title}</h1>
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
      <div>
        {this.renderPost()}
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.changeHandler}
          />
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
    );
  }
}

export default Post;
