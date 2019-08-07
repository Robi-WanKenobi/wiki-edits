import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart'
import Socket from './providers/Socket'
import { TiWarningOutline, TiTickOutline } from 'react-icons/ti';

class App extends Component {

  constructor(){
    super();
    this.state = {
      connected: false,
      englishtData:[0, 0, 0, 0, 0, 0, 0],
      germanData:[0, 0, 0, 0, 0, 0, 0],
      yAxisMax:10000
    }

    // establish websocket connection to backend server.
    let ws = new WebSocket('ws://localhost:4000');
    let socket = this.socket = new Socket(ws);

    // handle connect and discconnect events.
    socket.on('connect', this.onConnect);
    socket.on('disconnect', this.onDisconnect);

    /* EVENT LISTENERS */

    // event listener to handle sendData from the server
    socket.on('connected', this.getData);
  }

  onConnect = () => {
      this.setState({connected: true});
      // emits a connection to the server for getting data
      this.socket.emit('connection');
  }

  onDisconnect = () => {
      this.setState({connected: false});
  }

  // getData is an event listener/consumer that handles sendData from the backend server on the socket.
  getData = (data) => {
      if (data.English != null && data.German != null){
        this.setState({
          englishtData:data.English,
          germanData:data.German,
          yAxisMax:data.Max
        });
      }
  }

  render() {
    if (this.state.connected) {
      return (
        <div>
          <div className="text-center alert alert-success">
            <TiTickOutline /> Connected to server.
          </div>
          <div className="mod row">
            <div className="col-md-6">
              <Chart language="English" chartData={this.state.englishtData} yAxis={this.state.yAxisMax}/>
            </div>
            <div className="col-md-6">
              <Chart language="German" chartData={this.state.germanData} yAxis={this.state.yAxisMax}/>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div className="text-center alert alert-danger">
          <TiWarningOutline /> Server unreachable. Please <strong>switch it on</strong> and <strong>reload this page</strong>.
        </div>
      );
    }
  }
}

export default App;
