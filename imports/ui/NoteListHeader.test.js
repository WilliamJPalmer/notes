import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient){
  describe('NoteListHeader', function (){
    let meteorCall;
    let Session;

    beforeEach(function() {
      meteorCall = expect.createSpy()
      Session = {
        set: expect.createSpy()
      }
    });

    it('should call meteorCall on click', function(){
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);// meteorCall is the prop defined in NoteListheader.js

      wrapper.find('button').simulate('click');//want to simulate the click of the button
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id)//the err, first argument of the callback function, is undefined

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');//expect the click to call meteorCall with argument 'notes.list'
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });
    it('should not set Session for failed insert', function(){
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);// meteorCall is the prop defined in NoteListheader.js

      wrapper.find('button').simulate('click');//want to simulate the click of the button
      meteorCall.calls[0].arguments[1]({}, undefined)//an empty object for the err and undefined for the res

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');//expect the click to call meteorCall with argument 'notes.insert'
      expect(Session.set).toNotHaveBeenCalled();//tests that Session.set was not called due to an error insertings if there was an error
    });
  });
};
