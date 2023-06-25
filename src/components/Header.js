import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    valueSum: 0,
  };

  componentDidUpdate(prevProps) {
    const { expense } = this.props;
    if (prevProps.expense !== expense) {
      this.att();
    }
  }

  att = () => {
    const { expense } = this.props;
    let sum = 0;
    expense.forEach((obj) => {
      const quotation = obj.exchangeRates[obj.currency].ask;
      const valor = obj.value * quotation;
      sum += valor;
    });
    this.setState({ valueSum: sum.toFixed(2) });
  };

  render() {
    const { email } = this.props;
    const { valueSum } = this.state;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <h2 data-testid="total-field">{ valueSum }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expense: PropTypes.shape({
    forEach: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
