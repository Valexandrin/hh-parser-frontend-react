import React from 'react';
import axios from 'axios';
import Moment from 'moment';

function Vacancy(props) {
  return (
    <div class="vacancy" className='vacancy' onClick={props.onClick}>
      <div class='box'>      
        <div class='vacancy-box'>
          <div class={props.status}>
            <span class="status">{props.status}</span>
          </div>          
          <div><small>{props.published_at}</small></div>          
        </div>
        <div>
          <b>{props.name}</b>
        </div>
      </div>
      <p>{props.employer} | {props.area} | {props.schedule}</p>
      <p dangerouslySetInnerHTML={{ __html: props.requirement }} />                    
      <p dangerouslySetInnerHTML={{ __html: props.responsibility }} />      
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
        published_at={Moment(vacancy.published_at).format('DD.MM.YY HH:mm')}
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