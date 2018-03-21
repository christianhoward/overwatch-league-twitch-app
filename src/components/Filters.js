import React, { Component } from 'react';

import { teams } from './data/data.js';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            statusOptions: [{ name: 'All', value: '', color: null }, { name: 'Online', value: true, color: 'green' }, { name: 'Offline', value: false, color: 'red' }]
        }
    }
    componentDidMount() {
        this.setState({ teams });
    }
    renderTeams() {
        return this.state.teams.map(team => {
            return (
                <div className="team-logo" key={team.name}>
                    <img src={window.location.origin + `/img/team-logos/${team.logo}`} alt={team.name} onClick={(e) => this.props.filterTeams(e.target.getAttribute('data-name'))} data-name={team.name}/>
                </div>
            );
        });
    }
    renderTeamDropdown() {
        return this.state.teams.map(team => {
            return <option key={team.name} data-name={team.name}>{team.name}</option>
        });
    }
    renderStatus() {
        return this.state.statusOptions.map(statusOption => {
            return (
                <button key={statusOption.name} onClick={() => this.props.filterStatus(statusOption.value)} style={{ backgroundColor: `${statusOption.color}` }}>{statusOption.name}</button>
            );
        });
    }
    render() {
        return (
            <div>
                <div className="owl-logo">
                    <img src={window.location.origin + '/img/owl-logo.jpg'} onClick={(e) => this.props.clearFilters()} alt="Overwatch League Logo" />
                </div>  
                <div className="team-dropdown">
                    <select value={this.props.filteredTeam} onChange={(e) => this.props.filterTeams(e.target.options[e.target.selectedIndex].getAttribute('data-name'))}>
                        <option data-name={''}>All</option>
                        {this.renderTeamDropdown()}
                    </select>
                </div>                  
                <div className="team-filter-grid">
                    {this.renderTeams()}
                </div>
                <div className="status-filter">
                    {this.renderStatus()}
                </div>
            </div>
        );
    }
}

export default Filters;