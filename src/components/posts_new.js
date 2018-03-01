import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	renderField(field) {
		//with the ...field we say ok this is an object right here adn i want all the differents propperties 
		//and this object to be communicated as props to the input tag
		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input className="form-control" type="text"
					{...field.input}
				/>
				{field.meta.error}
			</div>
		);
	}

	onSubmit(values){
		console.log(values);
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


// string assigned to form : must be unique 
export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(PostsNew);

