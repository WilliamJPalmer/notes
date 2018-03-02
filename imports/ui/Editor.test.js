import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';//this is importing Enzymes

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient) {
  describe('Editor', function () {
    let browserHistory;//required prop for test cases since used in the handleBodyChange, handleTitleChange and handleRemoval
    let call;//required prop for test cases since used in the handleBodyChange, handleTitleChange and handleRemoval
    /* these two are passed in as propsTypes and the createComponent so they can be mocked out wiht spies to make sure they
    get called when expected.*/
    beforeEach (function() {
      call = expect.createSpy()
      browserHistory = {//this is an object because will want to call push method
        push: expect.createSpy()//push is the spy because 'browserHistory.push' is called in handleRemoval
      };
    });
    it('should render pick note message', function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Please select or create a Note to start');
    });
    it('should render note not found', function(){
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id}/>);
      //notes[0]._id goes into the fixtures/fiztures.js file and takes the id of the first object.
      expect(wrapper.find('p').text()).toBe('Note Not Found');
    });
    it('shold remove note', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);
      wrapper.find('button').simulate('click');

      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);//notes.remove is string in handleRemoval function and
      //notes[0]._id is getting the id of the note passed in the const wrapper value.
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });
  });
}
