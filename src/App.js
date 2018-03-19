import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [{
        user_login: 'disguisedtoasths',
        user_id: '87204022',
        online: false,
        thumbnail_url: null
      }, {
        user_login: 'fedmyster',
        user_id: '39040630',
        online: false,
        thumbnail_url: null
      }, {
        user_login: 'xchocobars',
        user_id: '42583390',
        online: false,
        thumbnail_url: null
      }, {
        user_login: 'tsm_myth',
        user_id: '110690086',
        online: false,
        thumbnail_url: null
      }]
    }
  }
  componentDidMount() {
    this.getTwitchData();
  }
  getStreamData(activeStreams) {
    let newState = this.state.streams;
    newState.forEach(user => {
      activeStreams.find(onlineUser => {
        if (onlineUser.user_id === user.user_id) {
          user.online = true;
          user.thumbnail_url = onlineUser.thumbnail_url;
          user.viewer_count = onlineUser.viewer_count;
          user.game_id = onlineUser.game_id;
          user.title = onlineUser.title;
        }
      });
    });
    this.setState({ streams: newState });
  }
  async getTwitchData() {
    let concat = '';
    this.state.streams.forEach(user => {
      if (concat === '') {
        concat += `user_id=${user.user_id}`;
      } else {
        concat += `&user_id=${user.user_id}`;
      }
    });
    let url = `https://api.twitch.tv/helix/streams?${concat}`;
    const response = await fetch(url, { 
      method: 'GET', 
      headers: { 'Client-ID': 'chrlypyhyi13ef5uf1dilc9amybdp3' }
    });
    let json = await response.json();
    // console.log(json.data);
    this.getStreamData(json.data);
  }
  render() {
    return this.state.streams.filter(stream => stream.online === true).map(stream => {
      return (
        <div key={stream.user_id}>{stream.user_login}<br/>viewers: {stream.viewer_count}</div>
      );
    });
  }
}

export default App;
