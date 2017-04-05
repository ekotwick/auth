import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import store from '../store'
import { unSetUser } from '../redux/user';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
    this.onLogoutSubmit = this.onLogoutSubmit.bind(this)
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/"><img src="/images/logo.png" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/users" activeClassName="active">users</Link>
              </li>
              <li>
                <Link to="/stories" activeClassName="active">stories</Link>
              </li>
            </ul>
            { this.renderLogout() }
            { this.renderLoginSignup() }
          </div>
        </div>
      </nav>
    );
  }

  renderLoginSignup() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
         <Link to="/signup" activeClassName="active">signup</Link>
        </li>
        <li>
          <Link to="/login" activeClassName="active">login</Link>
        </li>
      </ul>
    );
  }

  renderLogout() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.onLogoutSubmit}>
          logout
        </button>
        </li>
      </ul>
    );
  }



onLogoutSubmit(){
  console.log(store.getState());
  // put the axios elsewhere; keet all axios requests in thunks
  axios.put('/logout', {});
  // const userId = store.getState().user.id
  this.props.onLogoutSubmit();
  console.log(store.getState());  
}

}


/* -----------------    CONTAINER     ------------------ */

const mapProps = null;

const mapDispatch = dispatch => {
  return {
    onLogoutSubmit() {
      dispatch(unSetUser());
      browserHistory.push('/');
    }
  }
};

export default connect(mapProps, mapDispatch)(Navbar);
