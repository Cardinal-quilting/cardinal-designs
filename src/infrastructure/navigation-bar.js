import React, { Component } from 'react'
import {Link} from "react-router-dom";

import './../styles/navigation-bar.css';
import logo from './../../src/figures/logos/CardinalQuiltsSmallLogo.png';

class NavigationBar extends Component {
    render() {
        return (
            <div>
            <header class="nav-header">
            <img src={logo} alt="small_logo" className="nav-logo"/>
            <h1 class="nav-title">Cardinal designs</h1>
            <div>
                <Link to="/" className="nav-link">Home</Link>
            </div>
            </header>
            <body class="Project-body">
            </body>
          </div>
        )
    }
}

export default NavigationBar;