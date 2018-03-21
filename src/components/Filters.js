import React, { Component } from 'react';

import { teams } from './data/data.js';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            statusOptions: [{ name: 'All', value: '', color: '#6441A4' }, { name: 'Online', value: true, color: 'green' }, { name: 'Offline', value: false, color: 'red' }]
        }
    }
    componentDidMount() {
        this.setState({ teams });
    }
    renderTeams() {
        return this.state.teams.map(team => {
            if (team.name === this.props.filteredTeam) {
                return (
                    <div className="team-logo active" key={team.name}>
                        <img src={window.location.origin + `/img/team-logos/${team.logo}`} alt={team.name} onClick={(e) => this.props.filterTeams(e.target.getAttribute('data-name'))} data-name={team.name}/>
                    </div>
                );
            } else {
                return (
                    <div className="team-logo" key={team.name}>
                        <img src={window.location.origin + `/img/team-logos/${team.logo}`} alt={team.name} onClick={(e) => this.props.filterTeams(e.target.getAttribute('data-name'))} data-name={team.name}/>
                    </div>
                );
            }
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
                <div className="radio" key={statusOption.name}>
                    <input type="radio" name="status" id={statusOption.name}
                        value={statusOption.value} 
                        checked={this.props.filteredStatus === statusOption.value} 
                        onChange={() => this.props.filterStatus(statusOption.value)} />
                    <label htmlFor={statusOption.name} style={{ backgroundColor: `${statusOption.color}` }}>{statusOption.name}</label>
                </div>
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