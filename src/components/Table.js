import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <header>
          { expenses.length > 0 && (
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
                    <td>{parseInt(obj.value, 10).toFixed(2)}</td>
                    <td>{obj.exchangeRates[obj.currency].name}</td>
                    <td>{parseFloat(obj.exchangeRates[obj.currency].ask).toFixed(2)}</td>
                    <td>
                      {
                        (parseFloat(obj.exchangeRates[obj.currency].ask)
                          * parseInt(obj.value, 10)).toFixed(2)
                      }
                    </td>
                    <td>Real</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </header>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
