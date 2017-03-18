// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Include the Helper (for the query)
var helpers = require('../utils/helpers');

console.log("results")
// Query Component Declaration
var Results = React.createClass({ 

	// Here we will save states for the contents we save 
	getInitialState: function(){
		return { 
			title: "",
			url: "",
			pubdate: "",
		}
	},

	// /*This code handles the sending of the search terms to the parent Search component*/
	handleClick: function(item, event){
		console.log("ok", item)
		helpers.postSaved(item.headline.main, item.web_url, item.pub_date)
			.then(function(data){
			}.bind(this))

	},


	// Here we render the function
	render: function(){

			// We loop through the results and create divs for each.

			var articles = this.props.results.map(function(article, index){

				// Each article thus reperesents a list group item with a known index
				return(
						<div key={index}>

						  <li className="list-group-item" >
								
							<h3>
							  	<span><em>{article.headline.main}</em></span>
								<span className="btn-group pull-right" >
									<a href={article.web_url} target="_blank"><button className="btn btn-default ">View Article</button></a>

									{/*By binding the button with the article we can save the article contents to our db*/}
									<button className="btn btn-primary" onClick={this.handleClick.bind(this, article)}>Save</button>
								</span> 
							</h3>
							<p>Date Published: {article.pub_date}</p>

							
						  </li>

						</div>
				)

			}.bind(this))

		return(
			<div className ="main-container">


				<div className="row">
					<div className="col-lg-12">

						<div className="panel panel-primary">
							<div className="panel-heading">
								<h1 className="panel-title"><strong><i className="fa fa-list-alt"></i>Results</strong></h1>
							</div>
							<div className="panel-body">
								<ul className="list-group">
								  
									{articles}

								</ul>					
							</div>
						</div>

					</div>
				</div>

			</div>
		)

	}

});

module.exports = Results;
