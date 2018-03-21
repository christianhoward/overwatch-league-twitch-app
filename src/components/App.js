import React, { Component } from 'react';

import Filters from './Filters';
import Streamers from './StreamerCards';

import { streams } from './data/data.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [],
      filteredTeam: '',
      filteredStatus: ''
    }
    this.filterTeams = this.filterTeams.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }
  componentDidMount() {
    this.setState({ streams: streams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) });
    setTimeout(() => { this.getTwitchData()}, 1000);
  }
  getStreamData(activeStreams) {
    let newState = this.state.streams;
    newState.forEach(user => {
      activeStreams.find(onlineUser => {
        if (onlineUser.user_id === user.user_id) {
          let url = onlineUser.thumbnail_url.replace(/({width})|({height})/ig, 200);
          user.online = true;
          user.thumbnail_url = url;
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
  filterTeams(team) {
    this.setState({ filteredTeam: team });
  }
  filterStatus(status) {
    this.setState({ filteredStatus: status})
  }
  clearFilters() {
    this.setState({ filteredStatus: '', filteredTeam: '' });
  }
  render() {
    return (
      <div>
        <div className="header">
          <img src={window.location.origin + '/img/twitch_white_logo.png'} alt="Twitch Logo" />
        </div>
        <Filters filteredTeam={this.state.filteredTeam} filteredStatus={this.state.filteredStatus} filterTeams={this.filterTeams} filterStatus={this.filterStatus} clearFilters={this.clearFilters} />
        <div style={{ paddingBottom: '10px' }}>
          <Streamers {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
