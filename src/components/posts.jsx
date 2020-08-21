import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: null
    }

    constructor(props) {
        super(props);
        this.getPosts = this.getPosts.bind(this)
    }

    getPosts () {
        fetch("http://localhost:8000/reviews")
        .then(res => res.json())
        .then(data => {
            this.setState({ posts: data });
        });
    }

    componentWillMount() {
        this.getPosts();
    }

    renderPosts() {
        if(this.state.posts === null) {
            return <p>There are no post!</p>
        } else {
            return (
                <div>
                    {this.state.posts.map(post => ( 
                        <Link to={`/posts/${post._id}`} key={post._id}>
                            <p>{post.title}</p>
                        </Link>
                        ) )}
                </div>
            )
        }
    }
    render() { 
        return (  
            <div>
                <h1>Website Validation Result</h1>
                {this.renderPosts()}
                <Link to="/">
                    <button className="btn btn-primary">Go Back Homepage</button>
                </Link>
            </div>
        );
    }
}
 
export default Posts;