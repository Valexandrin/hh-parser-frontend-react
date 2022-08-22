import React from 'react';
import axios from 'axios';
import Moment from 'moment';

function Vacancy(props) {
  return (
    <div class='vacancy' onClick={props.onClick}>  
      <div class='box'>
        <div>      
          <b>{props.name}</b>
        </div>        
        <div>
          <small class={props.status}>{props.status}</small>
          <small> {props.published_at}</small>
        </div>        
      </div>

      <div class='box'>
        <small>{props.employer}</small>
        <small>{props.area}</small>
        <small>{props.schedule}</small>
      </div>

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
      <div class='board'>
        <div class='vacancies-list'>
          {this.state.vacancies.map(vacancy =>                    
              this.renderVacancy(vacancy)
          )}
        </div>        
        <div class='description' dangerouslySetInnerHTML={{ __html: this.state.description }} />        
      </div>     
    )
  }
}