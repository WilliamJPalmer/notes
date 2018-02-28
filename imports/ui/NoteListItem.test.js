import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should render title and timestamp', function() {
      const title = "My Title";
      const updatedAt = 1519792858675;
      const wrapper = mount( <NoteListItem note={{title, updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('2/27/2018');

    });
    it('should set default title if not title set', function(){
      const title = '';
      const updatedAt = 1519792858675;
      const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe('Untitled Note');
      //if no title was give, title should be "Untitle Note" as in NoteListItem.js
    });
  });
};
