// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');
console.log("4")
// Create the Main component
var Main = React.createClass({

  render: function(){

    return(
      /*We can only render a single div. So we need to group everything inside of this main-container one*/
      <div className="main-container">


        <div className="container">

          <div className="jumbotron">
            <h1 className="text-center"><strong>New York Times Article Scrubber</strong></h1>
            <h3 className="text-center">Search for and annotate articles of interest.</h3>
          </div>

          {this.props.children}


        </div>
      
      </div>
    )
  }
});

// Export the module back to the route
module.exports = Main;