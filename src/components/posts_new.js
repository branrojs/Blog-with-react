import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  createPost} from '../actions';

class PostsNew extends Component {
	renderField(field) {
		//with the ...field we say ok this is an object right here adn i want all the differents propperties 
		//and this object to be communicated as props to the input tag
		// ternary expresion (condition ? true : false)

		const { meta: {touched, error } } = field;
		const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values){
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
		 //this string needs to match one of the different routes that 
									  // defined inside of our app
	}

	render() {
		//component property for forms takes in a function or another component to display the field.
		const { handleSubmit }= this.props;

					// (val)    redux form side || server side (callback)
		return (
			<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
				<Field 
					label="Title"
					name="title"
					component={ this.renderField }
				/>
				<Field 
					label="Categories"
					name="categories"
					component={ this.renderField }
				/>
				<Field 
					label="Post Content"
					name="content"
					component={ this.renderField }
				/>
				<button type="submit" className="btn btn-primary">submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {

	const errors = {};

	//validate the inputs from 'values'
	if(!values.title){
		errors.title = "Enter a title!";
	}

	if (!values.categories) {
		errors.categories = "Enter some categories!";
	}

	if (!values.content) {
		errors.content = "Enter some content";
	}


	//if errors is empty, the form is fine to submit
	// if errors has any properties, redux form assumes form is invalid
	return errors;
}


// string assigned to form : must be unique // combine redux connect with redux form
export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect( null,{ createPost })(PostsNew)
);

