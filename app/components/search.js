// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Include the Query and Results componens
var Query = require('./Search/query');
var Results = require('./Search/results');
var Saved = require('./saved/saved');

// Include the Helper (for the query)
var helpers = require('./utils/helpers');

// Create the Search component
var Search = React.createClass({

  /*Here we set the initial state variables (this allows us to propagate the variables for maniuplation by the children components*/
  /*Also note the "resuls" state. This will be where we hold the data from our results*/
  getInitialState: function(){
    return {
      queryTerm: "",
      startYear: "",
      endYear: "",
      results: []
    }
  },


  /*This function gets called if the user searches for a completely new set of parameters (i.e. if any of the search terms changes)*/
  /*If the user searches for the exact same thing, then React will ignore it.*/
  componentDidUpdate: function(prevProps, prevState){

    if (this.state.queryTerm != "" && (prevState.queryTerm != this.state.queryTerm || prevState.startYear != this.state.startYear || prevState.endYear != this.state.endYear))
    {
      helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)
        .then(function(data){
          if (data != this.state.results)
          {
            this.setState({
              results: data
            })
          }

        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
        }.bind(this))
    }
  },

  // This function will be passed down into children components so they can change the "parent"
  // i.e we will pass this method to the query component that way it can change the main component
  // to perform a new search
  setQuery: function(newQuery, newStart, newEnd){

    this.setState({
      queryTerm: newQuery,
      startYear: newStart,
      endYear: newEnd
    })
  },

  /*Render the function. Note how we deploy both the Query and the Results*/
  render: function(){

    return(

      <div className="main-container">

        {/*Note how we pass the setQuery function to enable Query to perform searches*/}
        <Query updateSearch={this.setQuery} />
        
        {/*Note how we pass in the results into this component*/}
        <Results results={this.state.results}/>

        {/*Note how we pass in the results into this component*/}
        <Saved results={this.state.results}/>

      </div>

    )
  }
});

// Export the module back to the route
module.exports = Search;