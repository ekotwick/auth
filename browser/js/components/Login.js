import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setUser } from '../redux/user';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {

    

    const user = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    console.log(user);
    event.preventDefault();
    this.props.onLoginSubmit(user);
    // console.log(`${message} isn't implemented yet`);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });

const mapDispatch = (dispatch) => {
  return {
    onLoginSubmit(user) {
      dispatch(setUser(user));
    }
  }
};

export default connect(mapState, mapDispatch)(Login);


// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleOne (song, list) {
//       dispatch(toggleSong(song, list));
//     }
//   }
// }
