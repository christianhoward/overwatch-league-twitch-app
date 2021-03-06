import React, { Component } from 'react';

import Filters from './Filters';
import Streamers from './StreamerCards';

import { streams } from './data/data';
import { clientID } from './config/keys';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [],
      filteredTeam: '',
      filteredStatus: '',
      loading: true
    }
    this.filterTeams = this.filterTeams.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }
  componentDidMount() {
    this.setState({ streams: streams });
    setTimeout(() => { this.getDataStrings()}, 2000);
    setTimeout(() => { this.setState({ loading: false }) }, 4000);
  }
  getStreamData(activeStreams) {
    let newState = this.state.streams;
    newState.forEach(user => {
      activeStreams.find(onlineUser => {
        if (onlineUser.user_id === user.user_id) {
          let url = onlineUser.thumbnail_url.replace(/({height})/ig, 200).replace(/({width})/ig, 275);
          user.online = true;
          user.thumbnail_url = url;
          user.viewer_count = onlineUser.viewer_count;
          user.game_id = onlineUser.game_id;
          user.title = onlineUser.title;
        }
      });
    });
    this.setState({ streams: newState.sort((a, b) => {
      return b.online - a.online || a.name.toLowerCase().localeCompare(b.name.toLowerCase()); 
    }) });
  }
  getDataStrings() {
    let userIDsAtlantic = '';
    let userIDsPacific = '';
    let teams = ['Boston Uprising', 'Florida Mayhem', 'Houston Outlaws', 'London Spitfire', 'New York Excelsior', 'Philadelphia Fusion'];
    this.state.streams.forEach(user => {
      if (teams.includes(user.team)) {
        if (userIDsAtlantic === '') {
          userIDsAtlantic += `user_id=${user.user_id}`;
        } else {
          userIDsAtlantic += `&user_id=${user.user_id}`;
        }
      } else {
        if (userIDsPacific === '') {
          userIDsPacific += `user_id=${user.user_id}`;
        } else {
          userIDsPacific += `&user_id=${user.user_id}`;
        }
      }
    });
    let urlAtlantic = `https://api.twitch.tv/helix/streams?${userIDsAtlantic}`;
    let urlPacific = `https://api.twitch.tv/helix/streams?${userIDsPacific}`;
    this.getTwitchData(urlAtlantic);
    this.getTwitchData(urlPacific);
  }
  async getTwitchData(url) {
    const response = await fetch(url, { 
      method: 'GET', 
      headers: { 'Client-ID': clientID }
    });
    let json = await response.json();
    this.getStreamData(json.data);
  }
  filterTeams(team) {
    if (this.state.filteredTeam === team) {
      this.setState({ filteredTeam: '' });
    } else {
      this.setState({ filteredTeam: team });
    }
  }
  filterStatus(status) {
    this.setState({ filteredStatus: status})
  }
  clearFilters() {
    this.setState({ filteredStatus: '', filteredTeam: '' });
  }
  render() {
    let content;
    if (this.state.loading) {
      content = <div className="loader" style={{ textAlign: 'center' }}></div>;
    } else {
      content = <div className="animate-bottom">
        <Streamers {...this.state} />
        <div className="footer">
          created by: <a href="https://www.christianhoward.net" target="_blank" rel="noopener noreferrer">Christian Howard</a>
        </div>
      </div>;
    }
    return (
      <div>
        <div className="header">
          <img src={`https://res.cloudinary.com/hg88pz06q/image/upload/v1522906875/img/twitch_white_logo.png`} alt="Twitch Logo" />
        </div>
        <Filters 
          filteredTeam={this.state.filteredTeam} 
          filteredStatus={this.state.filteredStatus} 
          filterTeams={this.filterTeams} 
          filterStatus={this.filterStatus} 
          clearFilters={this.clearFilters} />
        <div style={{ paddingBottom: '10px' }}>
          {content}
        </div>
      </div>
    );
  }
}

export default App;
