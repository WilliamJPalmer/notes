import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';//necessary to create container components

export const PrivateHeader = (props) => {
  return (
    <div className="title-bar">
      <div className="title-bar__content">
        <h1 className="title-bar__title">{props.title }</h1>
        {/* <button onClick={() => Accounts.logout()} className="button button--link-text">Logout</button> */}
        <button onClick={() => props.handleLogout()} className="button button--link-text">Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired
  //passing the logout method as a propType alows iserting a spy in
  //testing suite and the real version in the dev and production environments.
}
 export default createContainer(() =>{//need to export the container so it can be used, hence export default
   /* the function needs to be written. Any props that get passed into the container component still need to get passed through.
   so {props.title}, as in the <h1> above would work without being mentioned here.
   Need to include handleLogout for the logout. Return an object that has all the props.*/
   return {
     handleLogout: () => Accounts.logout()
   };
 }, PrivateHeader);
//export default PrivateHeader; this will be exported as a named export instead on const PricateHeader line
