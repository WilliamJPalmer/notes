import React from 'react';

import PrivateHeader from './PrivateHeader';//don't need braces here because we are importing. This is the containerized component


export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        Dashboard page content
      </div>
    </div>
  )
}
/*container is passed in via <PrivateHeader/> with the required title prop. the
PrivateHeader component also requires the handleLogout prop, which contains the logout function.
The handleLogout comes from the container component and it runs the funtion through trackerAutorun
and anything that gets return is passed on to the presentational component as a prop.
*/
