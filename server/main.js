import 'babel-polyfill';
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';//this gives access to the webapp behind the scenes
//that serves the content. Allows allows to attach middleware.

import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

});
