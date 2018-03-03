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
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Session.set('isNavOpen', false);//hides the menu after clicking a note in the list or creating a new note.
    if (selectedNoteId){
      browserHistory.replace(`/dashboard/${selectedNoteId}`);

    }
});
/*this Tracker.autorun looks for a change in the value of selectedNoteId and when there is a change,
the url will be updated.*/
Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);//this targets a class in the body and checks if it exists based on boolean value of variable isNavOpen. If the value is true, the class 'is-nave-open' will be added. If the value is false, the class 'is-nav-open' will be removed. This allows for this toggled class to be targeted by styles and other code. when the class exists, we can show, style or do something.
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);//this is the Meteor Session Variable that will be used for updating notes.
  Session.set('isNavOpen', false);//the navigation, sidebar, should not show up when app is loaded.
  ReactDOM.render(routes, document.getElementById('app'));
});
