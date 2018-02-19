import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser} from './users';

if(Meteor.isServer) {//this will test only on the server
  describe ('users', function(){
    it('should allow valid email address', function(){
      const testUser = {//this is testing that the email is valid. Gets the user object
        emails: [//that has an object of emails which is an array
          {
            address: 'email1@email.com'//and that contains a object of address with address and valid email
          }
        ]
      };
      const result = validateNewUser(testUser);
      expect(result).toBe(true);
    });
    it('should reject invalid email address', function(){
      const testUser = {
        emails: [
          {
            adress: 'email1.com'
          }
        ]
      };
      expect(()=>{
        validateNewuser(testUser);
      }).toThrow();
    });
  });
};

// const add = (a, b) => {
//   if (typeof(b) !== 'number'){
//     return  a+a;
//   }
//   return a+b;
// };
//
// const square = (a) => a*a;
//
// describe('add', function(){
//   it('should add two numbers', function(){
//     const result = add(11,9);
//     expect(result).toBe(20);//this assertion replaces the if and throw statements below.
//     // if (result !== 20){
//     //   throw new Error('Sum not equal to expected value')
//     // }
//   });
//
//   it('should double single number', function(){
//     const result = add(44);
//     expect(result).toBe(88);//this assertion replaces the if and throw statements below.
//   });
// });
//
// describe('square', function(){
//   it('should square a number', function (){
//     const result = square(9);
//     expect(result).toBe(81);
//   });
// });
