import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  handleBodyChange(event) {
    this.props.call('notes.update', this.props.note._id, {
      body: event.target.value
    });//'notes.update' takes two arguments, first is id of note and second is update object.
  }//event.target gives access to the DOM element and value gives access to update the body
  handleTitleChange(event) {
    this.props.call('notes.update', this.props.note._id, {
      title: event.target.value
    });
  }
  render() {
    // if(this.props.note){
    //   return(
    //     <p>We got your note</p>
    //   );
    // } else if(this.props.selectedNoteId){
    //   return (
    //     <p>Note Not Found</p>
    //   );
    // } else {
    //   return (
    //     <p>Pick or create a note to get started</p>
    //   );
    // }
    if(this.props.note){//if a note is found with the id
      return(
        <div>
          <input value={this.props.note.title} placeholder='Your Note Title' onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.props.note.body} placeholder='Your Note Content' onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
          {this.props.selectedNoteId ? 'Note Not Found' : 'Please select or create a Note to get started.'};
        </p>
      );//if the selectedNoteId in URL not found, first message. If selectedNoteId empty string, second message. This
    }// ternary operator takes the places of the else if and else in the code commented out above.
  }
};

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId: selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call// adding call allows this.props.call in the handleBodyChange and handleTitleChange methods up top
  };
}, Editor);
