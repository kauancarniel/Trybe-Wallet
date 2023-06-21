import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <input data-testid="value-input" type="number" placeholder="Valor:" />
        <textarea data-testid="description-input" placeholder="Descrição da despesa:" />
        <select data-testid="currency-input">
          {currencies.map((coin, key) => (
            coin !== 'USDT' ? <option key={ key }>{coin}</option>
              : null
          )) }
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
