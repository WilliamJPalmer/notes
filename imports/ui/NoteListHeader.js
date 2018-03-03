import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
  return (
    <div className="item-list__header">
      <button className="button" onClick={() => {
        props.meteorCall('notes.insert', (err, res) => {
          if(res){//if there is a response to creating a new note
            props.Session.set('selectedNoteId', res)//sets the selectedNoteId to the id of the newly created note.
          }
        });
      }}>Create Note</button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired//incliding Session gives access to the meteorCall 'notes.insert'
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session: Session
  }
}, NoteListHeader);
