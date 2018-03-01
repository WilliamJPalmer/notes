import React from 'react';

import PrivateHeader from './PrivateHeader';//don't need braces here because we are importing. This is the containerized component
import NoteList from './NoteList';
// import NoteListHeader from './NoteListHeader';


export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <NoteList/>
      </div>
    </div>
  );
};
/*container is passed in via <PrivateHeader/> with the required title prop. the
PrivateHeader component also requires the handleLogout prop, which contains the logout function.
The handleLogout comes from the container component and it runs the funtion through trackerAutorun
and anything that gets return is passed on to the presentational component as a prop.


for the NotesList, this works the same. Don't need to have the notelist array in the
JSX here. that is because it is returned in the container in NoteList.js and that is
passed into the named export NoteList, which is imported at the top.*/
