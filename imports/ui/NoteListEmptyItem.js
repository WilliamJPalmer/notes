import React from 'react';
// import {Meteor} from 'meteor/meteor';

const NoteListEmptyItem = () => {
  return (
    <div>
      <h5>You have no notes</h5>
      <p>Create a note to get started</p>
    </div>
  );
};

export default NoteListEmptyItem;

/*Setting a variable, const NoteListEmptyItem, equal to the stateless functional component.
this allows us to export the varaible as the default value, export defaul NoteListEmptyItem.
Doing this also makes the NoteList.test.js file work when testing to see that the NoteListEmptyItem is
loaded when there are no notes. If you do not create the variable here and export it, the assertion,
expect(wrapper.find('NoteListEmptyItem').length).toBe(1); will not pass.*/
