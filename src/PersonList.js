import React from 'react';

import axios from 'axios';

import api from './api';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    api.get(`users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}