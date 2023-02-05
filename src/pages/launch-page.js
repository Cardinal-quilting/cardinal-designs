import React, { Component } from 'react'
import {Link} from "react-router-dom";

import './../styles/navigation-bar.css';
import './../styles/launch-page.css';
import logo from './../../src/figures/logos/CardinalQuiltsLogo.png';

class LaunchPage extends Component {
    render() {
        return (
            <div className="Launch">
            <header className="Launch-header">
                <Link to="/project" className="nav-link Launch-link">New project</Link>
                <h1>Cardinal designs</h1> 
                <img src={logo} alt="large_logo" className="Launch-logo"/>
            </header>
          </div>
        )
    }
}

export default LaunchPage;