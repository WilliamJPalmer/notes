import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


export class Login extends React.Component {//this is changed to a named export so the default createContainer can be used.
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(event) {
    event.preventDefault();//prevents a full page refresh
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    this.props.loginWithPassword({email},password, (err) => {//changed from Meteor.loginWithPassword because
      //the createContainer export has this already and it was defined as a prop with Login.PropTypes.
      //console.log('login callback', err);
      if (err) {
        this.setState({error: err.reason});
        //console.log(err.reason);
      } else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Login</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}
            {/* the above line looks to see if there is an error, if error is true,
              the message from onSubmit will be printed. If error is false, undefined
              will be returned and nothing will be rendered to the screen */}
            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
              <input type='email' ref="email" name='email' placeholder='Email'/>
              <input type='password' ref="password" name='password' placeholder='Password'/>
              <button className="button">Login</button>
            </form>

            <Link to='/signup'>Create an account?</Link>
          </div>

        </div>
    );
  }
}
Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
}

export default createContainer(() => {//default export so does not need { } when imported.
  return{
    loginWithPassword: Meteor.loginWithPassword//this overrides the Meteor.loginWithPassword, which has been changed
    //to this.props.loginWithPassword, line 18ish
  };
}, Login);
