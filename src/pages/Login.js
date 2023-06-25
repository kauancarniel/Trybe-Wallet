import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

const validateEmailRegex = /^\S+@\S+\.\S+$/;
const min = 6;
let pass = '';
let email = '';

class Login extends React.Component {
  state = {
    buttonDis: true,

  };

  onchange = ({ target }) => {
    if (target.name === 'validEmail') email = target.value;
    if (target.name === 'validPass') pass = target.value;
    if (validateEmailRegex.test(email) === true && pass.length >= min) {
      this.setState({ buttonDis: false });
    } else this.setState({ buttonDis: true });
  };

  click = () => {
    const { dispatch, history } = this.props;
    const action = addEmail(email);
    dispatch(action);
    history.push('/carteira');
  };

  render() {
    const { buttonDis } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="validEmail"
          onChange={ this.onchange }
          placeholder="Digite seu E-mail:"
        />
        <input
          data-testid="password-input"
          type="password"
          name="validPass"
          onChange={ this.onchange }
          placeholder="Digite sua senha:"
        />
        <button disabled={ buttonDis } onClick={ this.click }>Entrar</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  em: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
