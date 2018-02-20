import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if(Meteor.isServer){
  describe('notes', function(){
    const noteOne = {//setting noteOne = the object below allows updating the information to be done more easily
      _id: 'testNoteId1',
      title: 'myTitle',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };
    beforeEach(function() {
      Notes.remove({});//this will remove all notes in the db.
      /* When running Meteor in test mode, it is using a separate databse. This means
      that Notes.remove ({}) will not delete development data. All development data is intact.*/
      Notes.insert(noteOne);
    });
    it('should insert new note', function(){
      const userId = 'testid'
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: userId });//can be .apply({ userId }) in ES6
      /* Meteor.server.method_handlers['notes.insert'] is the same method as what
      is defined in notes.js after 'notes.insert'. the [] are necessary in the
      Meteor.server.method_hbndlers['notes.insert'] because the . is a special character
      Apply is a javascript feature that is a way of calling a function specifying your own
      this context.
      */
      expect(Notes.findOne({ _id, userId: userId })).toExist();//can be .finOne({ _id, userId }) in ES6
    });

    it('should not insert note if not authenticated', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });
    it('should remove note', function(){
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
      /* .array takes two arguments in this case. The first is the object that is set to the this context.
      The second argument is an array and every value in the array is passed into the function as an argument.
      since the note is being deleted by the _id, only need to pass that in the array. This is because the
      notes.remove function in notes.js is only using the _id as an argument.*/
      expect(Notes.findOne({ _id: noteOne._id})).toNotExist();
    });
    it('shold not remove note if not authenticated', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);//tests to see if can remove note w/o userId
      }).toThrow();
    });
    it('should not remove note when no note ID', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });
    it('should update note', function(){
      const title = "Updated title here"
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId//the is the this context object
      }, [
        noteOne._id,
        { title }//this array has two values that are passed as arguments since the title is being changed. Const noteOne
      ]);
      const note = Notes.findOne(noteOne._id);//to make sure update worked, need ot return note that was updated.

      expect(note.updatedAt).toBeGreaterThan(0);// 0 is default for updated at, is also 1970, value should be greater than 0.
      expect(note).toInclude({
        title,//this is the new Title, defined in the vairable "title" above
        body : noteOne.body// body should be the same as the seed data in the variable noteOne
      });
    });

    it('should throw error if extra updates', function () {
      const name = "William";
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { name },//name is not a field in the note object so an error would occur.
        ]);
      }).toThrow();
    });

    it('should not update note if user was not creator', function (){
      const title = "Updated title here"
      Meteor.server.method_handlers['notes.update'].apply({
        userId: "FakeUser"//the is the this context object
      }, [
        noteOne._id,
        { title }//this array has two values that are passed as arguments since the title is being changed. Const noteOne
      ]);
      const note = Notes.findOne(noteOne._id);//to make sure update worked, need ot return note that was updated.

      expect(note).toInclude(noteOne);
    });
    it('shold not update note if not authenticated', function (){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });
    it('should not update note when no note ID', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });
  });
}
