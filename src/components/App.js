import React, { Component } from 'react';

import Filter from './TeamFilter';

import { streams } from './data/data.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [],
      filteredTeam: null
    }
    this.filterTeams = this.filterTeams.bind(this);
  }
  componentDidMount() {
    this.setState({ streams });
    setTimeout(() => { this.getTwitchData()}, 1000);
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
  filterTeams(e) {
    this.setState({ filteredTeam: e.target.getAttribute('data-name') });
  }
  renderOnline() {
    return (this.state.filteredTeam === null ? this.state.streams : this.state.streams.filter(stream => stream.team === this.state.filteredTeam)).map(stream => {
      return (
        <div key={stream.user_id}>{stream.user_login}<br/>viewers: {stream.viewer_count}</div>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="header">
          <img src={window.location.origin + '/img/twitch_white_logo.png'} alt="Twitch Logo" />
        </div>
        <Filter filterTeams={this.filterTeams} />
        {this.renderOnline()}
      </div>
    );
  }
}

export default App;
