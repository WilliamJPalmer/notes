import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';
import { browserHistory } from 'react-router';

export class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });//in ES5, it would be this.setStae({body: body})
    this.props.call('notes.update', this.props.note._id, { body });//'notes.update' takes two arguments, first is id of note and second is update object.
  }//event, e,.target gives access to the DOM element and value gives access to update the body
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleRemoval(){
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState){// componentDidUpdate is a lifecycle method
    //componentDidUpdate is called right after the props or state for the coponent get changed. prevProps and prevState are available for accessing old values before change and still be able to use new values.
    const currentNoteId = this.props.note ? this.props.note._id : undefined;// if the note exists, can set current note id to this.props.note._id. If does not exist, set to undefined
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;// if previous note

    if (currentNoteId && currentNoteId !== prevNoteId) {//if currentNoteId exist and, &&, currentNoteid is not equal to prevNoteId
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
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
          <input value={this.state.title} placeholder='Your Note Title' onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.state.body} placeholder='Your Note Content' onChange={this.handleBodyChange.bind(this)}></textarea>
          <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
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
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId: selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,// adding call allows this.props.call in the handleBodyChange and handleTitleChange methods up top
    browserHistory
  };
}, Editor);
