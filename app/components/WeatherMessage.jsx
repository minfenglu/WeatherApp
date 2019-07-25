var React = require('react');

var WeatherMessage = React.createClass({
  render: function () {
    var {location, temp} = this.props;
    return (
      <h4> {location} is now {temp}. </h4>
    )
  }
})

module.exports = WeatherMessage;
