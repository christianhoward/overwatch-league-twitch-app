import React, { Component } from 'react';

class TeamFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [{
                name: 'SF Shock'
            }, {
                name: 'Offline TV and Friends'
            }]
        }
    }
    renderTeams() {
        return this.state.teams.map(team => {
            return (
                <div onClick={(e) => this.props.filterTeams(e)}>{team.name}</div>
            );
        });
    }
    render() {
        return (
            <div>{this.renderTeams()}</div>
        );
    }
}

export default TeamFilter;