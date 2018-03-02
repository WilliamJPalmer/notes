import 'babel-polyfill';
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Session} from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

/* removed the onEnterPublicPage and onEnterPrivatePage functions as they are not needed due to nesting routes and the globalOnChange nad globalOnEnter methods that make use of the privacy prop defined in each route. */
const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);//nextState is a property of onEnter and can get the params.id there.
};
const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';//if currentPagePrivacy is eqaul to 'unauth' currently on unauth page
  const isAuthenticatedPage = currentPagePrivacy === 'auth';//if currentPagePrivacy is eqaul to 'auth' currently on auth page

  if (isAuthenticated && isUnauthenticatedPage){
    browserHistory.replace('/dashboard')// if user is logged in and navigates to an unauthenticate page, goes to links page
    //.replace instead of .push
  }else if (!isAuthenticated && isAuthenticatedPage){
    browserHistory.replace('/')// if user is NOT logged in and navigates to an authenticate page, goes to login page
    //.replace instead of .push
  }
};

export const globalOnChange = (prevState, nextState) => {//global applies to all routes, nested and non-nested.
  globalOnEnter(nextState);//allows reuse of the code below without having to rewrite it
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length -1];//this grabs the last route on the routes array.
  Session.set('currentPagePrivacy', lastRoute.privacy);//key value pair with currentPagePrivacy being set to value of privacy in the lastRoute. Because the privacy is a prop of the route, we can access the prop and get the value of it. for the '/' and '/signup' pages, the value of currentPagePrivacy will be "unauth" and will be "auth" for the '/dashboard' pages. for '*', it will be undefined.
};
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path='/' component={Login} privacy="unauth"/>
      <Route path='/signup' component={Signup} privacy="unauth"/>
      <Route path='/dashboard' component={Dashboard} privacy="auth"/>
      <Route path='/dashboard/:id' component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);//privacy="unauth" and privacy="auth" are being used for public and private pages. Allows to removed the onEnter={onEnterPublic/PrivatePage} from the first three routes wiht paths
