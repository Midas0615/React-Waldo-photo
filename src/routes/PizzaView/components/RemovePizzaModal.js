import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { REMOVE_PIZZA_REQUEST } from 'redux/constants';
import { injectIntl } from 'components/Intl';

export class RemovePizzaModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    className: PropTypes.string,
    formatMessage: PropTypes.func.isRequired,
    removePizza: PropTypes.func.isRequired,
    selectedkey: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    selectedkey: '',
  };

  removePizza(key) {
    const { removePizza, toggle } = this.props;
    removePizza(key);
    toggle();
  }

  render() {
    const { isOpen, toggle, className, formatMessage, selectedkey } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={` ${className}`.split(' ').join(' modal-')}
      >
        <div className="add-modal">
          <ModalHeader toggle={toggle}>{formatMessage('Remove Pizza')}</ModalHeader>
          <ModalBody>
            <span>
              {formatMessage('Do you want to remove this pizza?')}
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>{formatMessage('Cancel')}</Button>{' '}
            <Button color="primary" className="px-4" onClick={this.removePizza.bind(this, selectedkey)}>{formatMessage('Remove')}</Button>
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removePizza: key => dispatch({ type: REMOVE_PIZZA_REQUEST, payload: { key } }),
});

export default connect(null, mapDispatchToProps)(injectIntl(RemovePizzaModal));
