import React from 'react';
import axios from 'axios';
import Moment from 'moment';

function Vacancy(props) {
  return (
    <div className='vacancy' onClick={props.onClick}>      
      <ul>
        <div>
          <span class={props.status}>
            <span class="status">{props.status}</span>
          </span>
          <span class="vacancy-name">{props.name}</span>
        </div>            
        <li>{props.area}</li>            
        <li>{props.published_at}</li>
        <li>{props.employer}</li>          
        <li>{props.schedule}</li>          
        <li dangerouslySetInnerHTML={{ __html: props.requirement }} />                    
        <li dangerouslySetInnerHTML={{ __html: props.responsibility }} />          
      </ul>
    </div>
  )
}

export default class Board extends React.Component {
  state = {
    vacancies: ['EMPTY LIST']
  }

  componentDidMount() {    
    axios.get('/api/v1/vacancies/')
    .then(res => {
      this.setState({ vacancies: res.data })
    })
  }

  renderVacancy(vacancy) {
    return (
      <Vacancy 
        name={vacancy.name}
        status={vacancy.status}
        area={vacancy.area}
        published_at={Moment(vacancy.published_at).format('DD MMM YYYY HH:mm')}
        employer={vacancy.employer}
        schedule={vacancy.schedule}
        requirement={vacancy.requirement}
        responsibility={vacancy.responsibility}
        onClick={() => prompt("Hi")}
      />
    )
  }

  render() {
    return (      
      this.state.vacancies.map(vacancy =>
        <div className='board-row'>
          {this.renderVacancy(vacancy)}
        </div>        
      )      
    )
  }
}