import React, { Component } from 'react';

class StreamerCards extends Component {
    renderCard() {
        let streams;
        if (this.props.filteredTeam !== '' && this.props.filteredStatus !== '') {
            streams = this.props.streams.filter(stream => stream.team === this.props.filteredTeam && stream.online === this.props.filteredStatus);
        } else if (this.props.filteredTeam === '' && this.props.filteredStatus !== '') {
            streams = this.props.streams.filter(stream => stream.online === this.props.filteredStatus);
        } else if (this.props.filteredTeam !== '' && this.props.filteredStatus === '') {
            streams = this.props.streams.filter(stream => stream.team === this.props.filteredTeam);
        } else {
            streams = this.props.streams;
        }
        return streams.map(stream => {
            if (stream.online === true) {
                return (
                    <div className="streamer-card" key={stream.user_id}>
                        <div className="card-grid">
                            <div>
                                <img src={stream.thumbnail_url} alt={stream.user_login} />
                            </div>
                            <div className="demo-grid">
                                <div className="card-header">
                                    <div style={{ fontSize: '18px' }}>{stream.name}</div>
                                    <div style={{ color: 'green' }}>{stream.online ? 'Online' : 'Offline'}</div>
                                </div>
                                <div style={{ paddingLeft: '5px' }}>
                                    <div>Viewers: {stream.viewer_count}</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <a href={`https://www.twitch.tv/${stream.user_login}`} target="_blank"><button>Visit</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="streamer-card" key={stream.user_id}>
                        <div className="card-grid">
                            <div>
                                <img src={window.location.origin + `/img/team-logos/${stream.thumbnail_url}`} style={{ height: '200px' }} alt={stream.user_login} />
                            </div>
                            <div className="demo-grid">
                                <div className="card-header">
                                    <div style={{ fontSize: '18px' }}>{stream.name}</div>
                                    <div style={{ color: 'red' }}>{stream.online ? 'Online' : 'Offline'}</div>
                                </div>
                                <div></div>
                                <div style={{ textAlign: 'center' }}>
                                    <a href={`https://www.twitch.tv/${stream.user_login}`} target="_blank"><button>Visit</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }
    render() {
        return (
            <div className="streamers-grid">{this.renderCard()}</div>
        );
    }
}

export default StreamerCards;