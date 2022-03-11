import { Component } from "react";
import { useRef, useEffect } from "react";
import "./Chat.css";

const client = new WebSocket('wss://chat-server-spring.herokuapp.com/chat');

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], message: { from: props.from, text: "" } };
  }

  handleChange(e) {
    this.setState({
      message: {
        ...this.state.message,
        text: e.target.value,
      },
    });
  }

  // Manda il messaggio salvato sullo state e lo azzera
  sendMessage = () => {
    client.send(JSON.stringify(this.state.message));
    this.setState({
      message: {
        ...this.state.message,
        text: "",
      },
    });
  };

  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
      message = JSON.parse(message.data)
      let id = this.state.messages.length
      this.setState({
        messages: [
          ...this.state.messages,
          {
            id: id+1,
            from: message.from,
            text: message.text,
          },
        ],
      });
      console.log(this.state.messages);
    };
    client.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  render() {
    return (
      <div>
        <div className="chatbox">
          <div className="chat-heading">
            <h3 className="white">Chat React e WebSockets</h3>
          </div>
          {/* key={message.id ? message.id : 0} */}
          <div id="messages" className="messages">
            {this.state.messages.map((message) => {
              return (
                <div id="message-wrapper" key={message.id ? message.id : 0}>
                  <div className="message-from">{message.from}</div>
                  <div className="message-text">
                    <div className="bg-blue">{message.text}</div>
                  </div>
                </div>
              );
            })}
            <AlwaysScrollToBottom />
          </div>
          <div className="message-input">
            <input
              className="message-input-text"
              value={this.state.message.text || ""}
              onChange={this.handleChange.bind(this)}
            ></input>
            <button
              className="message-input-send"
              onClick={() => this.sendMessage()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;