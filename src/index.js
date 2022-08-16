import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VacancyList from './vacancyList';


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
      <div>
        <h3>Local time: {this.state.date.toLocaleTimeString()}</h3>        
      </div>
    );
  }
}


class Board extends React.Component {
  render() {
    return (
      <div>
        <Clock />       
        <VacancyList />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
