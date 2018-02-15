import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { ADD_PIZZA_REQUEST } from 'redux/constants';
import Select from 'react-select';
import { injectIntl } from 'components/Intl';
import _ from 'lodash';

export class AddPizzaModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    className: PropTypes.string,
    formatMessage: PropTypes.func.isRequired,
    addPizza: PropTypes.func.isRequired,
    pizzaSizes: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
  };

  static defaultProps = {
    className: '',
    pizzaSizes: [
      {
        name: 'small',
      },
    ],
  };

  state = {
    selectedOption: null,
    selectedTopping: [],
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleCheckBoxChange(topping, index, count, { target }) {
    const { selectedTopping } = this.state;
    if (target.checked) {
      const item = {
        key: index,
        value: topping,
      };
      selectedTopping.push(item);
      if (count !== null) {
        if (selectedTopping.length <= count) {
          this.setState({ selectedTopping });
        }
      } else {
        this.setState({ selectedTopping });
      }
    } else {
      _.remove(selectedTopping, currentObject => currentObject.key === index);
      this.setState({ selectedTopping });
    }
  }

  generateID(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  addPizza(pizzaInfo) {
    const { selectedTopping } = this.state;
    const { addPizza, toggle } = this.props;
    const onePizza = {
      key: this.generateID(24),
      value: {
        name: pizzaInfo.name,
        basePrice: pizzaInfo.basePrice,
        toppings: selectedTopping,
      },
    };
    addPizza(onePizza);
    toggle();
  }

  render() {
    const { isOpen, toggle, className, pizzaSizes, formatMessage } = this.props;
    const { selectedOption, selectedTopping } = this.state;
    const value = selectedOption && selectedOption.value;
    const pizzaInfo = pizzaSizes[value];
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={` ${className}`.split(' ').join(' modal-')}
      >
        <div className="add-modal">
          <ModalHeader toggle={toggle}>{formatMessage('Add Pizza')}</ModalHeader>
          <ModalBody>
            <Card className="mx-4">
              <CardBody>
                <FormGroup className="mb-3">
                  <Select
                    closeOnSelect
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
                        <p>{formatMessage('Max Toppings')}:</p>
                        <p>{pizzaInfo.maxToppings === null ? 'unlimited' : pizzaInfo.maxToppings }</p>
                      </div>
                      <div className="data">
                        <p>{formatMessage('Base Price')}:</p>
                        <p>{pizzaInfo.basePrice}</p>
                      </div>
                      <div className="toppings">
                        {
                          pizzaInfo.toppings.map((topping, index) => {
                            const selected = selectedTopping.find(t => t.key === index);
                            const possibleLength = pizzaInfo.maxToppings === null ? 10 : pizzaInfo.maxToppings;
                            return (
                              <div key={index} className="topping">
                                <Input
                                  id={index}
                                  type="checkbox"
                                  disabled={!selected && selectedTopping.length >= possibleLength}
                                  onClick={this.handleCheckBoxChange.bind(this, topping, index, pizzaInfo.maxToppings)}
                                />
                                <label htmlFor={index}>{topping.topping.name}</label>
                                <p className="price">{topping.topping.price}</p>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  )}
                </FormGroup>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="px-4" disabled={value === null} onClick={this.addPizza.bind(this, pizzaInfo)}>{formatMessage('Add')}</Button>
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    pizzaSizes: state.toJS().pizza.pizzaSizes,
  };
}

const mapDispatchToProps = dispatch => ({
  addPizza: pizza => dispatch({ type: ADD_PIZZA_REQUEST, payload: { pizza } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddPizzaModal));
