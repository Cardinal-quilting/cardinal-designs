import React, { Component } from 'react'
import DropdownMenu from '../infrastructure/dropdown-menu';
import Tooltip from '../infrastructure/tooltip';

import './../styles/infrastructure/navigation-bar.css';
import logo from './../../src/figures/logos/CardinalQuiltsSmallLogo.png';

class NavigationBar extends Component {
    render() {
        return (
            <div>
            <header className="nav-header">
            <img src={logo} alt="small_logo" className="nav-logo"/>
            <h1 className="nav-title">Cardinal designs</h1>
            <DropdownMenu 
                    name="Options" 
                    font_size="2.5vmin" 
                    font_weight="bold" 
                    unselected_background_color="--grey-theme"
            />
            </header>
          </div>
        )
    }
}

export default NavigationBar;