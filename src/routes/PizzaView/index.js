import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardBody, Button, FormGroup, Form, Input } from 'reactstrap';
import { injectIntl } from 'components/Intl';
import Select from 'react-select';
import { LIST_PIZZA_REQUEST, GET_PIZZA_REQUEST } from 'redux/constants';

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
    pizzaSizeByName: PropTypes.shape({
      name: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
      ]),
    }),
  }

  static defaultProps = {
    pizzaSizes: [
      {
        name: 'small',
      },
    ],
    pizzaSizeByName: {
      name: 'small',
    },
  }

  state = {
    selectedOption: '',
  }

  componentDidMount() {
    const { getAllPizzaSizes, getPizzaSizeByName } = this.props;
    getAllPizzaSizes();
    getPizzaSizeByName();
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const {
      formatMessage,
      pizzaSizes,
      pizzaSizeByName,
    } = this.props;
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const pizzaInfo = pizzaSizes[selectedOption.value];
    console.log(pizzaInfo, pizzaSizeByName);
    return (
      <div>
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="content-list">
                <div className="title">
                  <p>Pizza Ordering</p>
                </div>
                <Card className="mx-4">
                  <CardBody>
                    <Form onSubmit={(e) => {
                      e.preventDefault();
                      // loginUser(Serializer.serialize(e.target, { hash: true }));
                    }}>
                      <FormGroup className="mb-3">
                        <Select
                          options={[
                            { value: 2, label: 'LARGE' },
                            { value: 1, label: 'MEDIUM' },
                            { value: 0, label: 'SMALL' },
                          ]}
                          value={value}
                          onChange={this.handleChange}
                        />
                        { pizzaInfo && (
                          <div className="card">
                            <div className="data">
                              <p>Max Toppings</p>
                              <p>{pizzaInfo.maxToppings === null ? 'unlimited' : pizzaInfo.maxToppings }</p>
                            </div>
                            <div className="data">
                              <p>Base Price</p>
                              <p>{pizzaInfo.basePrice}</p>
                            </div>
                            <div className="toppings">
                              {
                                pizzaInfo.toppings.map((topping, index) => (
                                  <div key={index} className="topping">
                                    <Input type="checkbox" />{' '}
                                    <p>{topping.topping.name}</p>
                                    <p className="price">{topping.topping.price}</p>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        )}
                      </FormGroup>
                      <Button type="submit" color="primary" className="px-4">{formatMessage('Add')}</Button>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            </Col>
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
  };
}

const mapDispatchToProps = dispatch => ({
  getAllPizzaSizes: () => dispatch({ type: LIST_PIZZA_REQUEST }),
  getPizzaSizeByName: size => dispatch({ type: GET_PIZZA_REQUEST, payload: { size } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PizzaView));
