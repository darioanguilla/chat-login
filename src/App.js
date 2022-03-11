import './App.css';
import Chat from './components/Chat';
import { Component } from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  startChat = (event) => {
    console.log(event);
    event.preventDefault();
    <Chat from={this.state.value}/>

  };

  render() {
    return (
      <div>
      <form onSubmit={this.startChat}>
        <label>
          Nome:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Invia" />
      </form>
      </div>
    );
  }
}

export default App;