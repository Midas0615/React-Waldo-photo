import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'components/Intl';
import { LOGIN_USER_REQUEST } from 'redux/constants';

class PizzaView extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentWillReceiveProps({ history }) {
    if (localStorage.getItem('tokenInfo') !== '') {
      history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
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
