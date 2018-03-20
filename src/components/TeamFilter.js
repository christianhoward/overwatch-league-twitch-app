import React, { Component } from 'react';

import { teams } from './data/data.js';

class TeamFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }
    componentDidMount() {
        this.setState({ teams });
    }
    renderTeams() {
        return this.state.teams.map(team => {
            return (
                <div className="team-logo" key={team.name}>
                    <img src={window.location.origin + `/img/team-logos/${team.logo}`} alt={team.name} onClick={(e) => this.props.filterTeams(e)} data-name={team.name}/>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                <div className="owl-logo">
                    <img src={window.location.origin + '/img/owl-logo.jpg'} data-name={null} onClick={(e) => this.props.filterTeams(e)} alt="Overwatch Leauge Logo" />
                </div>                    
                <div className="team-filter-grid">
                    {this.renderTeams()}
                </div>
            </div>
        );
    }
}

export default TeamFilter;