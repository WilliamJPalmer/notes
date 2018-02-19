import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

export const validateNewUser = (user) => {//need to export the validateNewUser for testing.
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({email:email});//ES6 shorthand lets this be written as .validate({ email })

  return true;
}
 if(Meteor.isServer){//this will run when it is on the server and not the client.
   Accounts.validateNewUser(validateNewUser);
 };

/*code above refactored for testing*/
// Accounts.validateNewUser((user) => {
//   const email = user.emails[0].address;
//
//   new SimpleSchema({
//     email: {
//       type: String,
//       regEx: SimpleSchema.RegEx.Email
//     }
//   }).validate({email:email});//ES6 shorthand lets this be written as .validate({ email })
//
//   return true;
// });
