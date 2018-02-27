import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';//this is importing Enzymes

import { Login } from './Login';

if(Meteor.isClient){
  describe('login', function(){
    it('should show error messages', function(){
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={()=>{}}/>);//empty function because only checking for error messages to show
      wrapper.setState({ error });

      expect(wrapper.find('p').text()).toBe(error);
      /* wrapper.find.('p').text() will look through the the Login component JSX for a <p>. If it is there, it will
      compare the text in that <p> to the error variable.*/
      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
      /* this looks for <p> in the wrapper and since the variable error was set to an empty string
      there should be 0 paragrpah tags. that is why .length propertyis used and toBe() is 0.*/
    });
    it('should called loginWtihPassword with from data', function(){
      const email = "example1@email.com";
      const password = "password";
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>)

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      /* .ref targets the ref that are part of the elements. Using .node makes this a regular DOM element so standard javascript can be used to manipulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement to
      see the properties and what can be used. Value is used to set the current value */
      wrapper.find('form').simulate('submit');
      expect(spy.calls[0].arguments[0]).toEqual({email: email});//first item in array is an aboject so need to use toEqual to compare objects
      expect(spy.calls[0].arguments[1]).toBe(password);//use toBe becasue comparing strings.
    });
    it('should set loginWithPassword callback errors', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy}/>);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});//the third argument of the loginWithPassword from Login.js. Testing to see if there is an error since the object is empty
      expect(wrapper.state('error')).toNotBe('') ;

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}
