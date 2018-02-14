import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'components/Intl';
import { LOGIN_USER_REQUEST } from 'redux/constants';

class PizzaView extends Component {
  render() {
    return (
      <div>
        adfasdf
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state,
  };
}

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch({ type: LOGIN_USER_REQUEST, payload: { user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PizzaView));
