import React, { Component } from 'react'

import Button from "infrastructure/button";

import OptionsDropdown from './options-dropdown';

import 'styles/pages/project-page/navigation-bar.css';
import logo from 'figures/logos/CardinalQuiltsSmallLogo.png';

/**
 * The navigation bar for the project page
 * @prop {function} props.save_project The functionality to save the project
 * @prop {function} props.save_project_as The functionality to save the project at a user specified location
 * @prop {function} props.announce_dropdown_state Pass True to this function if the a dropdown menu is open and False if it is closed.
 * @prop {function} props.enabled=true True: The user can use the navigation bar tools, False: The navigation bar tools are disabled.
 * @prop {*} state.dropdown_state True: The corresponding dropdown menu in the navigation bar is open, False: The corresponding dropdown menu is closed
 */
class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdown_state: {
                options: false
            }
        }

        this.options_state = this.options_state.bind(this);
    }

    static defaultProps = {
        enabled: true
    }

    #has_open_dropdown(dropdown_state) {
        for( const [key, value] of Object.entries(dropdown_state) ) {
            if( value ) { return true; }
        }
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        const dropdown_open = this.#has_open_dropdown(this.state.dropdown_state)
        if( dropdown_open!=this.#has_open_dropdown(prevState.dropdown_state) ) { 
            this.props.announce_dropdown_state(dropdown_open)
        }
    }

    /**
     * @param {bool} options_state true: the options dropdown menu has been open, false: the options dropdown menue has been closed
     */
    options_state(options_state) {
        this.setState({
            dropdown_state: {
                options: options_state
            }
        });
    }

    render() {
        return (
            <div>
            <header className="nav-header">
            <img src={logo} alt="small_logo" className="nav-logo"/>
            <h1 className="nav-title">Cardinal designs</h1>
            <Button 
                name="Save"
                font_size="2.5vmin" 
                font_weight="bold" 
                background_color={getComputedStyle(document.documentElement).getPropertyValue("--grey-theme")}
                on_click={this.props.save_project}
                enabled={this.props.enabled}
            />
            <OptionsDropdown
                    name="Options" 
                    font_size="2.5vmin" 
                    font_weight="bold" 
                    unselected_background_color="--grey-theme"
                    announce_state={this.options_state}
                    enabled={this.props.enabled}
                    save_project={this.props.save_project}
                    save_project_as={this.props.save_project_as}
            />
            </header>
          </div>
        )
    }
}

export default NavigationBar;