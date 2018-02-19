import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if(Meteor.isServer){
  describe('notes', function(){
    it('should insert new note', function(){
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: userId });//can be .apply({ userId }) in ES6
      /* Meteor.server.method_handlers['notes.insert'] is the same method as what
      is defined in notes.js after 'notes.insert'. the [] are necessary in the
      Meteor.server.method_hbndlers['notes.insert'] because the . is a special character
      Apply is a javascript feature that is a way of calling a function specifying your own
      this centext.
      */
      expect(Notes.findOne({ _id, userId: userId })).toExist();//can be .finOne({ _id, userId }) in ES6
    });

    it('should not insert note if not authenticated', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

  });
}
