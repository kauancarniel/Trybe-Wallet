import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exclExpense } from '../redux/actions';

class Table extends Component {
  state = {
    valor: 0,
    coin: 'USD',
    use: 'Dinheiro',
    pay: 'Alimentação',
    descri: '',
    editing: false,
    idButton: 0,
  };

  xcl = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((obj) => obj.id !== parseInt(target.id, 10));
    const action = exclExpense(newExpenses);
    dispatch(action);
  };

  edit = ({ target }) => {
    const { editing, idButton, valor, coin, use, pay, descri } = this.state;
    const { expenses, dispatch } = this.props;
    if (editing === false) {
      this.setState({ editing: true, idButton: parseInt(target.id, 10) });
      dispatch({ type: 'editing' });
    } else {
      const objEdit = expenses.find((obj) => obj.id === idButton);
      const newExpenses = expenses.filter((obj) => obj.id !== idButton);
      objEdit.value = valor;
      objEdit.currency = coin;
      objEdit.method = use;
      objEdit.tag = pay;
      objEdit.description = descri;
      newExpenses.splice(idButton, 0, objEdit);
      const action = exclExpense(newExpenses);
      dispatch(action);
      dispatch({ type: 'editing' });
      this.setState({ editing: false });
    }
  };

  saving = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { editing } = this.state;
    const { expenses, currencies } = this.props;

    return (
      <div>
        <header>
          { editing === false ? (
            <table>
              <thead>
                <th>Descrição</th>
                <th>Tag</th>
                <th>Método de pagamento</th>
                <th>Valor</th>
                <th>Moeda</th>
                <th>Câmbio utilizado</th>
                <th>Valor convertido</th>
                <th>Moeda de conversão</th>
                <th>Editar/Excluir</th>
              </thead>
              {expenses.map((obj, key) => (
                <tbody key={ key }>
                  <tr>
                    <td>{obj.description}</td>
                    <td>{obj.tag}</td>
                    <td>{obj.method}</td>
                    <td>{parseFloat(obj.value).toFixed(2)}</td>
                    <td>{obj.exchangeRates[obj.currency].name}</td>
                    <td>{parseFloat(obj.exchangeRates[obj.currency].ask).toFixed(2)}</td>
                    <td>
                      {
                        (parseFloat(obj.exchangeRates[obj.currency].ask)
                          * parseInt(obj.value, 10)).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="delete-btn"
                        onClick={ this.xcl }
                        id={ obj.id }
                      >
                        Deletar
                      </button>
                      <button
                        onClick={ this.edit }
                        data-testid="edit-btn"
                        id={ obj.id }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
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
              <button onClick={ this.edit }>Editar despesa</button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

Table.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    filter: PropTypes.func,
    find: PropTypes.func,
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  editing: state.wallet.editing,
});

export default connect(mapStateToProps)(Table);
