import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveExpenses, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: 0,
    coin: 'USD',
    use: 'Dinheiro',
    pay: 'Alimentação',
    descri: '',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  saving = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  saveInGlobal = () => {
    const { valor, descri, coin, pay, use, id } = this.state;
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    const { quotation } = this.props;
    const action = { value: valor,
      currency: coin,
      method: use,
      tag: pay,
      description: descri,
      id,
      exchangeRates: quotation };
    dispatch(saveExpenses(action));
    this.setState({ id: id + 1 });
  };

  render() {
    const { currencies, fetching, editing } = this.props;
    return (
      <div>
        {editing || fetching === true ? <p>Carregando...</p>
          : (
            <div>
              <input
                name="valor"
                data-testid="value-input"
                type="number"
                placeholder="Valor:"
                onChange={ this.saving }
              />
              <textarea
                name="descri"
                data-testid="description-input"
                placeholder="Descrição da despesa:"
                onChange={ this.saving }
              />
              <select data-testid="currency-input" onChange={ this.saving } name="coin">
                {currencies.map((coin, key) => (
                  coin !== 'USDT' ? <option key={ key }>{coin}</option>
                    : null
                )) }
              </select>
              <select data-testid="method-input" onChange={ this.saving } name="use">
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
              <select data-testid="tag-input" onChange={ this.saving } name="pay">
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
              <button onClick={ this.saveInGlobal }>Adicionar despesa</button>
            </div>
          )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  quotation: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  fetching: state.wallet.fetching,
  quotation: state.wallet.fetchObject,
  editing: state.wallet.editing,
});

export default connect(mapStateToProps)(WalletForm);
