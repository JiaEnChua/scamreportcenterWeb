import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
    state = { 
        post: null
     }

    constructor(props) {
        super(props);
        this.getSinglePost = this.getSinglePost.bind(this);
        this.renderPost = this.renderPost.bind(this);
    }

    getSinglePost() {
        fetch("http://localhost:8000/reviews/"+this.props.match.params.id)
        .then(res => res.json())
        .then(data => {
            this.setState({ post: data });
        });
    }

    componentWillMount() {
        this.getSinglePost();
    }

    renderPost() {
        if(this.state.post === null) {
            return <p>There are no post!</p>
        } else {
            // console.log(this.state.post)
            return (
                <div>
                    <h1>{this.state.post.title}</h1>
                </div>
            )
        }
    }
    render() { 
        return ( 
            <div>
                {this.renderPost()}
                <Link to="/posts">
                    <button className="btn btn-secondary">Go Back All Posts</button>
                </Link>
                <br/>
                <Link to="/">
                    <button className="btn btn-primary">Go Back Homepage</button>
                </Link>
            </div>
         );
    }
}
 
export default Post;