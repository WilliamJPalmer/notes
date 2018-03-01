import 'babel-polyfill';
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';//for the second Tracker.autorun and the browserHistory.replace method.

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId(); //takes the truthy or falsey and turns it into a true boolena value.
  // a single ! with flip the value. two !! will return true or false.
  onAuthChange(isAuthenticated);
});

Session.set()

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    if (selectedNoteId){
      browserHistory.replace(`/dashboard/${selectedNoteId}`)
    }
});
/*this Tracker.autorun looks for a change in the value of selectedNoteId and when there is a change,
the url will be updated.*/

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);//this is the Meteor Session Variable that will be used for updating notes.
  ReactDOM.render(routes, document.getElementById('app'));
});
