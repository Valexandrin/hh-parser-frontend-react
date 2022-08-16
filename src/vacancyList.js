import React from 'react';
import axios from 'axios';

export default class VacancyList extends React.Component {
  state = {
    vacancies: ['EMPTY LIST']
  }

  componentDidMount() {    
    axios.get('/api/v1/vacancies/')
    .then(res => {
      this.setState({ vacancies: res.data })
    })
  }

  render() {
    return (      
      this.state.vacancies.map(vacancy =>        
        <a href='#'>
          <ul>
            <li class="vacancy-name">{vacancy.name}</li>
            <li>{vacancy.area}</li>          
            <li>{vacancy.published_at}</li>          
            <li><div class={vacancy.status}> {vacancy.status}</div></li>          
            <li>{vacancy.employer}</li>          
            <li>{vacancy.schedule}</li>          
            <li dangerouslySetInnerHTML={{ __html: vacancy.requirement }} />                    
            <li dangerouslySetInnerHTML={{ __html: vacancy.responsibility }} />          
          </ul>
        </a>
      )      
    )
  }
}