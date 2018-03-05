import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  fetchPost} from '../actions';

class PostsShow extends Component {
	componentDidMount(){
		if (!this.props.post) {
			const { id } = this.props.match.params; // provided by react router match>params (cart tokens in the url, this case :id)
			this.props.fetchPost(id);
		}
		
	}

	render() {
			//the posts right here is the extention created in the mapStateToProps, which is adquired form
			//the action creator, this one will contain the post fetched and it need to coincide with the 
			//attribute brought by mapStateToProps
		const { post } = this.props;
			//if to help the solution to fetch the result from the action creator
		if(!post){
			return <div>Loading...</div>
		}

		return(
			<div>
				<Link className="btn btn-primary" to="/">Back to Index</Link>
				<button 
				className="btn btn-danger pull-xs-right"
				onClic={this.onDelete}
				>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}
					// the big list of posts
function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost})(PostsShow);