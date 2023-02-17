import React, { Component } from 'react'
import './../styles/infrastructure/navigation-bar.css';
import './../styles/pages/launch-page.css';
import logo from './../../src/figures/logos/CardinalQuiltsLogo.png';

import ProjectButton from '../infrastructure/project-button';

class LaunchPage extends Component {
    render() {
        return (
            <div className="Launch">
            <header className="Launch-header">
                <ProjectButton name="New project" 
                    font_size="5vmin"
                    background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}
                    font_weight="bold"
                    on_click={() => window.location.replace("/project")}
                />
                <h1>Cardinal designs</h1> 
                <img src={logo} alt="large_logo" className="Launch-logo"/>
            </header>
          </div>
        )
    }
}

export default LaunchPage;