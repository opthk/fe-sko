import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class TrafficDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="selfCenter spaceBetween standardWidth">
        <TwitterTimelineEmbed
          sourceType="profile"
          linkColor="#F44336"
          userId={3254451158}
          theme="dark"
          noScrollbar
          transparent
          borderColor="#F44336"
          options={{ height: 810 }}
        />
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
  }
}
export default connect(mapStateToProps)(TrafficDaily)