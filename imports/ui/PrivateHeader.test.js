import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';//this is importing Enzymes

import { PrivateHeader } from './PrivateHeader';//need to import the component. Need braces as it is a named export.

if(Meteor.isClient){
  describe('PrivateHeader', function(){
    it('should set button text to logout', function() {
      const wrapper = mount( <PrivateHeader title="test Title" handleLogout={() => {}}/> )
      //wrapper is the building block for Enzyme assertions. Can look through rendered DOM to find items like buttons
      //and then its text value and use expect ot assert the text equals something.
      // Need to include the Proptype for handleLogout but does not need to be a real function for the test case

      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });
    it('should use title prop as H1 text', function (){
      const title = "Title of Fame";
      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> )
      const titleText = wrapper.find('h1').text();

      expect(titleText).toBe(title)
    });
    // it('should call the function', function(){
    //   const spy = expect.createSpy();
    //   spy(3,4,5);
    //   spy('William');
    //   //debugger;//this allows the spy calls to be viewed in the dev tools of Chrome and Safari. Stops code from running
    //   expect(spy).toHaveBeenCalledWith('William');
    // });
    it('should call handleLogout on click', function(){
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Title" handleLogout={spy}/> );
      wrapper.find('button').simulate('click');//if this is not simulated, the expect will fail becasue spy not called.
      expect(spy).toHaveBeenCalled();
    });
  });
}
