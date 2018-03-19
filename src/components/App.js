import React, { Component } from 'react';

import Filter from './TeamFilter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      streams: [{
        user_login: 'disguisedtoasths',
        user_id: '87204022',
        online: false,
        thumbnail_url: null,
        team: 'Offline TV and Friends'
      }, {
        user_login: 'fedmyster',
        user_id: '39040630',
        online: false,
        thumbnail_url: null,
        team: 'Offline TV and Friends'
      }, {
        user_login: 'xchocobars',
        user_id: '42583390',
        online: false,
        thumbnail_url: null,
        team: 'SF Shock'
      }, {
        user_login: 'tsm_myth',
        user_id: '110690086',
        online: false,
        thumbnail_url: null,
        team: 'SF Shock'
      }],
      filteredTeam: null
    }
    this.filterTeams = this.filterTeams.bind(this);
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
  filterTeams(e) {
    this.setState({ filteredTeam: e.target.innerHTML });
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
