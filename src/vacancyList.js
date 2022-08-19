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
          <span class="vacancy-name"><b> {props.name}</b></span>          
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
    vacancies: ['EMPTY LIST'],
    description: 'Place for a vacancy description',
  }

  componentDidMount() {    
    axios.get('/api/v1/vacancies/')
    .then(res => {
      this.setState({ vacancies: res.data })
    })    
  }

  renderDescription(uid) {    
    return (
      axios.get(`/api/v1/vacancies/${uid}`)
      .then(res => {
        this.setState({ description: res.data.description })
      })
    )
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
        onClick={() => this.renderDescription(vacancy.uid)}
      />
    )
  }

  render() {
    return (      
      <div class='box'>
        <div class='vacancies_list' className='board-row'>
          {this.state.vacancies.map(vacancy =>                    
              this.renderVacancy(vacancy)
          )}
        </div>        
        <div class='description'>
          <div dangerouslySetInnerHTML={{ __html: this.state.description }} />          
        </div>
      </div>     
    )
  }
}