import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'reactstrap';
import { injectIntl } from 'components/Intl';

import { LIST_PIZZA_REQUEST, GET_PIZZA_REQUEST } from 'redux/constants';

import AddPizzaModal from './components/AddPizzaModal';

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

  state = {
    createModal: false,
  }

  componentDidMount() {
    const { getAllPizzaSizes, getPizzaSizeByName } = this.props;
    getAllPizzaSizes();
    getPizzaSizeByName();
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal })

  render() {
    const {
      formatMessage,
      pizzaSizes,
      orderedPizzas,
    } = this.props;
    const {
      createModal,
    } = this.state;
    console.log('orderedPizzas', orderedPizzas);
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
                          <div key={index} className="topping">
                            <p className="name">{pizza.key}</p>
                            <p className="price">{pizza.value.basePrice}</p>
                          </div>
                        ))
                      }
                    </div>
                  }
                </Card>
                <div className="text-center mx-4 checkout-button">
                  <Button color="danger" className="px-4">{formatMessage('Checkout')}</Button>
                </div>
              </div>
            </Col>
            <AddPizzaModal
              isOpen={createModal}
              toggle={this.toggleCreateModal}
              className="primary"
              pizzaSizes={pizzaSizes}
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
