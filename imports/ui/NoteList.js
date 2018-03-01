import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import { Notes } from '../api/notes';
//will also need to import notes, like users, in server/main.js
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader/>
      { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
      {props.notes.map((note) => {
        return <NoteListItem key={note._id} note={note}/>
      })}

      Note List { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
}
export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch().map((note) => {//for every item in the notes array
      return { // return an object
        ...note, //Use spread operator to keep everyting that Note already has.
        selected: note._id === selectedNoteId// add 'selected' property. Selected will be a boolean and want to check
      };//if the note._id property equals the selectedNoteId from above. when the note is clicked, its ID can be used to pull information
    })//and allow the not to be targeted for styling or something else.
  }
}, NoteList);
