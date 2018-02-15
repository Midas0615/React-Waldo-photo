import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'reactstrap';
import { injectIntl } from 'components/Intl';

import { LIST_PIZZA_REQUEST, GET_PIZZA_REQUEST } from 'redux/constants';

import AddPizzaModal from './components/AddPizzaModal';
import RemovePizzaModal from './components/RemovePizzaModal';
import PriceModal from './components/PriceModal';

class PizzaView extends Component {
  static propTypes = {
    formatMessage: PropTypes.func.isRequired,
    getAllPizzaSizes: PropTypes.func.isRequired,
    getPizzaSizeByName: PropTypes.func.isRequired,
    pizzaSizes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
    orderedPizzas: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
  }

  static defaultProps = {
    pizzaSizes: [
      {
        name: 'small',
      },
    ],
    orderedPizzas: [
      {
        key: 'abc',
      },
    ],
  }

  constructor(props) {
    super(props);
    this.state = {
      createModal: false,
      removeModal: false,
      priceModal: false,
      selected: '',
      cost: '',
    };
    this.calculatePrice = this.calculatePrice.bind(this);
  }

  componentDidMount() {
    const { getAllPizzaSizes, getPizzaSizeByName } = this.props;
    getAllPizzaSizes();
    getPizzaSizeByName();
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal })

  toggleRemoveModal = key => this.setState({ removeModal: !this.state.removeModal, selected: !this.state.removeModal ? key : '' })

  togglePriceModal = () => this.setState({ priceModal: !this.state.priceModal })

  calculatePrice() {
    const { orderedPizzas } = this.props;
    const { priceModal } = this.state;
    let totalPrice = 0;
    orderedPizzas.map((pizza) => {
      let pizzaPrice = pizza.value.basePrice;
      pizza.value.toppings.map((topping) => {
        pizzaPrice += topping.value.topping.price;
      });
      totalPrice += pizzaPrice;
    });
    this.setState({
      cost: totalPrice,
      priceModal: !priceModal,
    });
  }

  render() {
    const {
      formatMessage,
      pizzaSizes,
      orderedPizzas,
    } = this.props;
    const {
      createModal,
      removeModal,
      priceModal,
      selected,
      cost,
    } = this.state;
    return (
      <div>
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="content-list">
                <div className="title">
                  <p>{formatMessage('Pizza Ordering')}</p>
                </div>
                <div className="text-right mx-4">
                  <Button color="primary" className="px-4" onClick={this.toggleCreateModal}>{formatMessage('Add')}</Button>
                </div>
                <Card className="mx-4 cart">
                  {orderedPizzas.length === 0 ?
                    <div className="empty">
                      <span>{formatMessage('There is no order yet')}</span>
                    </div>
                    :
                    <div>
                      {
                        orderedPizzas.map((pizza, index) => (
                          <Row key={index} className="topping">
                            <Col md={8} className="text-left">
                              <span>{pizza.key}</span>
                            </Col>
                            <Col md={2}>
                              <span>{pizza.value.basePrice}</span>
                            </Col>
                            <Col md={2}>
                              <a onClick={this.toggleRemoveModal.bind(this, pizza.key)}>{formatMessage('Delete')}</a>
                            </Col>
                          </Row>
                        ))
                      }
                    </div>
                  }
                </Card>
                <div className="text-center mx-4 checkout-button">
                  <Button color="danger" className="px-4" disabled={orderedPizzas.length === 0} onClick={this.calculatePrice}>{formatMessage('Checkout')}</Button>
                </div>
              </div>
            </Col>
            <AddPizzaModal
              isOpen={createModal}
              toggle={this.toggleCreateModal}
              className="primary"
              pizzaSizes={pizzaSizes}
            />
            <RemovePizzaModal
              isOpen={removeModal}
              toggle={this.toggleRemoveModal}
              className="primary"
              selectedkey={selected}
            />
            <PriceModal
              isOpen={priceModal}
              toggle={this.togglePriceModal}
              className="primary"
              pizzaSizes={pizzaSizes}
              totalCost={cost}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pizzaSizes: state.toJS().pizza.pizzaSizes,
    pizzaSizeByName: state.toJS().pizza.pizzaSizeByName,
    orderedPizzas: state.toJS().pizza.orderedPizzas,
  };
}

const mapDispatchToProps = dispatch => ({
  getAllPizzaSizes: () => dispatch({ type: LIST_PIZZA_REQUEST }),
  getPizzaSizeByName: size => dispatch({ type: GET_PIZZA_REQUEST, payload: { size } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PizzaView));
