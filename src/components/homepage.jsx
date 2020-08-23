import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Homepage extends Component {
  state = {
    title: "",
    redirect: "",
  };
  changeHandler = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  submitHandler = (event) => {
    event.preventDefault(); //Prevent page refresh
    if (this.state.title === "") {
      alert("Please enter a valid website URL");
    } else {
      axios
        .post("http://localhost:8000/reviews", { title: this.state.title })
        .then((res) => {
          // console.log(res.data);
          this.setState({ redirect: `/posts/${res.data._id}` });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  renderRedirect = () => {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }
  };
  render() {
    return (
      <div>
        <h1>Scan Website</h1>
        {this.renderRedirect()}
        <br />
        <form onSubmit={this.submitHandler}>
          <input type="text" name="title" onChange={this.changeHandler} />
          <button type="submit" className="btn btn-primary">
            Check
          </button>
        </form>
      </div>
    );
  }
}

export default Homepage;
