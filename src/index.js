import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Board from './vacancyList';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div class="clock">
        <h3>Local time: {this.state.date.toLocaleTimeString()}</h3>        
      </div>
    );
  }
}


class VacancyPage extends React.Component {
  render() {
    return (
      <div>
        <Clock />       
        <Board />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<VacancyPage />);
