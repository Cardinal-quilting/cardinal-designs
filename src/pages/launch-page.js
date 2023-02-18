import React, { Component } from 'react'
import './../styles/infrastructure/navigation-bar.css';
import './../styles/pages/launch-page.css';
import logo from './../../src/figures/logos/CardinalQuiltsLogo.png';

import ProjectButton from '../infrastructure/project-button';
import Tooltip from '../infrastructure/tooltip';

class LaunchPage extends Component {
    render() {
        return (
            <div className="Launch">
            <header className="Launch-header">
                <Tooltip 
                    xloc="10%"
                    hover="2500"
                    message="Create a new project using Cardinal Designs!"
                >
                <ProjectButton name="New project" 
                    font_size="5vmin"
                    background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}
                    font_weight="bold"
                    on_click={() => window.location.replace("/project")}
                />
                </Tooltip>
                <h1>Cardinal designs</h1> 
                <img src={logo} alt="large_logo" className="Launch-logo"/>
            </header>
          </div>
        )
    }
}

export default LaunchPage;