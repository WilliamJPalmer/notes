import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';//this is importing Enzymes

import { Signup } from './Signup';

if(Meteor.isClient){
  describe('signup', function(){
    it('should show error messages', function(){
      const error = 'This is not working';
      const wrapper = mount(<Signup createUser={()=>{}}/>);//empty function because only checking for error messages to show
      wrapper.setState({ error });

      expect(wrapper.find('p').text()).toBe(error);
      /* wrapper.find.('p').text() will look through the the Login component JSX for a <p>. If it is there, it will
      compare the text in that <p> to the error variable.*/
      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
      /* this looks for <p> in the wrapper and since the variable error was set to an empty string
      there should be 0 paragrpah tags. that is why .length propertyis used and toBe() is 0.*/
    });
    it('should call createUser with form data', function(){
      const email = "example1@email.com";
      const password = "password123";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      /* .ref targets the ref that are part of the elements. Using .node makes this a regular DOM element so standard javascript can be used to manipulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement to
      see the properties and what can be used. Value is used to set the current value */
      expect(spy.calls[0].arguments[0]).toEqual({email, password});//first item in array is an aboject so need to use toEqual to compare objects
    });

    it('should set error if short password', function(){
      const email = "example1@email.com";
      const password = "123                  ";
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      /* .ref targets the ref that are part of the elements. Using .node makes this a regular DOM element so standard javascript can be used to manipulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement to
      see the properties and what can be used. Value is used to set the current value */
      expect(wrapper.state('error').length).toBeGreaterThan(0);//tests that the length of the password is 8 or higher.
    });
    it('should set createUser callback errors', function(){
      const password = "password123";
      const reason = 'This why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error')).toBe(reason) ;

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}
