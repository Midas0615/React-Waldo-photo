import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'components/Intl';
import { LIST_PIZZA_REQUEST, GET_PIZZA_REQUEST } from 'redux/constants';

class PizzaView extends Component {
  static propTypes = {
    listPizzas: PropTypes.func.isRequired,
    getPizzaBySize: PropTypes.func.isRequired,
    pizzas: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
    pizzaSize: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
  }

  static defaultProps = {
    pizzas: [
      {
        name: 'small',
      },
    ],
    pizzaSize: {
      name: 'small',
    },
  }

  componentDidMount() {
    const { getPizzaBySize, listPizzas } = this.props;
    listPizzas();
    getPizzaBySize();
  }

  render() {
    console.log('pizzas', this.props.pizzas);
    console.log('pizzaSize', this.props.pizzaSize);
    return (
      <div>
        adfasdf
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pizzas: state.toJS().pizza.pizzas,
    pizzaSize: state.toJS().pizza.pizzaSize,
  };
}

const mapDispatchToProps = dispatch => ({
  listPizzas: () => dispatch({ type: LIST_PIZZA_REQUEST }),
  getPizzaBySize: () => dispatch({ type: GET_PIZZA_REQUEST }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PizzaView));
