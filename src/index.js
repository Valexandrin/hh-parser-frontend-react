import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PersonList from './PersonList';


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
        <h1>Local time: {this.state.date.toLocaleTimeString()}</h1>        
      </div>
    );
  }
}


class Board extends React.Component {
  render() {
    return (
      <div>
        <Clock />       
        <PersonList />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
