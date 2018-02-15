import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { injectIntl } from 'components/Intl';

export class PriceModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    className: PropTypes.string,
    formatMessage: PropTypes.func.isRequired,
    totalCost: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]),
  };

  static defaultProps = {
    className: '',
    totalCost: 0,
  };

  render() {
    const { isOpen, toggle, className, formatMessage, totalCost } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={` ${className}`.split(' ').join(' modal-')}
      >
        <div className="add-modal">
          <ModalHeader toggle={toggle}>{formatMessage('Total Cost')}</ModalHeader>
          <ModalBody>
            <span>
              {formatMessage('Total cost is')} {totalCost.toFixed(2)}
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="px-4" onClick={toggle}>{formatMessage('Ok')}</Button>
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(PriceModal);
