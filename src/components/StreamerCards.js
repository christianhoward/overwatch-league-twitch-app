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
                            <div className="stream-img">
                                <img src={stream.thumbnail_url} alt={stream.user_login} />
                            </div>
                            <div className="demo-grid">
                                <div className="card-header">
                                    <div>
                                        <div>{stream.name}</div>
                                        <div style={{ color: 'green' }}>{stream.online ? 'Online' : 'Offline'}</div>
                                    </div>
                                </div>
                                <div className="demographics">
                                    <div className="team-logo">
                                        <img src={window.location.origin + `/img/team-logos/${stream.team_url}`} alt={stream.team} />
                                    </div>
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
                            <div className="stream-img">
                                <img src={`https://res.cloudinary.com/hg88pz06q/image/upload/v1522906875/img/team-logos/${stream.team_url}`} alt={stream.user_login} />
                            </div>
                            <div className="demo-grid">
                                <div className="card-header">
                                    <div>{stream.name}</div>
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