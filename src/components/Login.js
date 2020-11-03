import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React, { useEffect } from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { useRecoilState } from 'recoil';
import {
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import {
  emailState,
  passwordState,
} from '../atoms';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

const Login = (props) => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);

  const submitForm = (email, password) => ev => {
    ev.preventDefault();
    props.onSubmit(email, password);
  }

  useEffect(() => {
    props.onUnload();
  }, []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">
                Need an account?
              </Link>
            </p>

            <ListErrors errors={props.errors} />

            <form onSubmit={submitForm(email, password)}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={ev => setEmail(() => (ev.target.value))} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={ev => setPassword(() => (ev.target.value))} />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={props.inProgress}>
                  Sign in
                </button>

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
