import React, { useState } from "react";
import * as signalR from "@microsoft/signalr";
import './TriggerComparison.css';

function TriggerComparison() {
  const [messages, setMessages] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const signalRUrl = process.env.REACT_APP_SIGNALR_URL;
  let connection;

  if (!isReady) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(signalRUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on('blobMessage', onBlobMessage);
    connection.onclose(() => {
      console.log('SignalR Disconnected.');
      setIsReady(false)
    });

    startSignalRConnection();
  }

  async function startSignalRConnection() {
    try {
      await connection.start();
      console.log('SignalR Connected');
      setIsReady(true);
    }
    catch (error) {
      console.log(error);
    }
  }
  
  function onBlobMessage(message) {
    setMessages(messages => messages.concat(message));
  }

  return(
    <div>
      <h1>Received Blob Messages</h1>
      <h2>SignalR Status: {isReady ? <span className="ok">Connected</span> : <span className="error">Disconnected</span>}</h2>
      <div className="receivedMessages">
        {messages.map((message, i) => {
          return (
            <div key={i}>
              <div className="message"><b>{message.TriggerType}</b> {message.FileName}: {new Date(message.TimeProcessed).toLocaleTimeString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TriggerComparison;