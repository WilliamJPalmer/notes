import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'(){
    if(!this.userId){
      throw new Meteor.Error('user not Authorized')
    }
    return Notes.insert({
      title:'',
      body:'',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },
  'notes.remove'(_id){
    if(!this.userId){
      throw new Meteor.Error('user not Authorized')
    }
    new SimpleSchema ({
      _id: {
        type: String, // makes usre the url id is a string. Must be String and not string
        min: 1 // makes sure id length is at least 1 character long.
      }
    }).validate({_id });
    Notes.remove ({ _id , userId: this.userId });
  },
  'notes.update'(_id, updates){//_id is the id of the note to update. "updates" is an object that has body and title, what is in the simple Schema
    if(!this.userId){
      throw new Meteor.Error('user not Authorized')
    }
    new SimpleSchema ({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional :true
      }
    }).validate({
      _id,
      ...updates// this spread operator will validate the title and/or body objects and error is anything else added. Anything that is added outside of this code, possible malicious inserts, will error out as only, -id, title and body are valid.
    });
    Notes.update({
      _id,
      userId: this.userId//adding this makes sure that the creator is updating the note.
    }, {
      $set: {//$set updates the entry while not erasing the orther entries.
        updatedAt: moment().valueOf(),
        ...updates//any changes to the title or body have been validated and will be updated here.
      }
    });
  }
});
