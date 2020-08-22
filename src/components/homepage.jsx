import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./homepage.css";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Homepage extends Component {
  state = {
    title: "",
    redirect: "",
  };
  changeHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  submitHandler = (event) => {
    event.preventDefault(); //Prevent page refresh
    axios
      .post("http://localhost:8000/reviews", { title: this.state.title })
      .then((res) => {
        // console.log(res.data);
        this.setState({ redirect: `/posts/${res.data._id}` });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  renderRedirect = () => {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }
  };
  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div id="piechart">
          <PieChart
            data={[
              { title: "One", value: 10, color: "#E38627" },
              { title: "Two", value: 15, color: "#C13C37" },
              { title: "Three", value: 20, color: "#6A2135" },
            ]}
          />
        </div>
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
