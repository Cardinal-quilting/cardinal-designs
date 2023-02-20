import React, { Component } from "react";

import NewProjectPopup from "pages/launch-page/new-project-popup";

import Button from "infrastructure/button";
import Tooltip from "infrastructure/tooltip";

import "styles/pages/launch-page/launch-page.css";

import logo from "figures/logos/CardinalQuiltsLogo.png";

/**
 * The Cardinal Designs launch page.
 * @prop {bool} state.page_active=true - Is the page active? false implies that a popup window is open.
 * @prop {bool} state.show_new_project_popup=false - Do we want to show the popup window to start a new project?
 */
class LaunchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page_active: true,
            show_new_project_popup: false,
        };

        this.start_new_project = this.start_new_project.bind(this);
    }

    /**
     * Display the popup window to start a new poject.
     */
    start_new_project() {
        this.setState({
            page_active: false,
            show_new_project_popup: true
        });
    }

    /**
     * Remove the popup window to start a new poject.
     */
    cancel_new_project() {
        this.setState({
            page_active: true,
            show_new_project_popup: false
        });
    }
     
    /**
     * @param {*} page_active Is the page currently active? 
     * @returns The background color of the page
     */
    background_color(page_active) {
        if( page_active ) {
            return getComputedStyle(document.documentElement).getPropertyValue("--grey-background-color")
            
        }
        return getComputedStyle(document.documentElement).getPropertyValue("--dark-grey-background-color");
    }

    /**
     * @param {*} page_active Is the page currently active? 
     * @returns The text color of the page
     */
    text_color(page_active) {
        if( page_active ) {
            return getComputedStyle(document.documentElement).getPropertyValue("--light-font-color");
            
        }
        return getComputedStyle(document.documentElement).getPropertyValue("--medium-font-color");
    }

    /**
     * @param {*} page_active Is the page currently active? 
     * @returns The page's buttons
     */
    button_color(page_active) {
        if( page_active ) {
            return getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme");
        }
        return getComputedStyle(document.documentElement).getPropertyValue("--grey-background-color");
    }
    
    /**
     * @returns The code to display the launch page.
     */
    render() {
        // get the colors of the various objects
        const background_opacity = this.state.page_active? 1.0 : 0.1;
        const button_color = this.button_color(this.state.page_active)
        const button_font_color = this.state.page_active? 
            getComputedStyle(document.documentElement).getPropertyValue("--light-font-color") :
            getComputedStyle(document.documentElement).getPropertyValue("--dark-font-color");

        return (
            <div className="launch">
            <header 
                className="launch-header"
                style={{
                    backgroundColor: this.background_color(this.state.page_active)
                }}
            >
                {/* The new project button with a tooltip */}
                <Tooltip 
                    pos={{
                        x: "5vw",
                        y: "-2vh"
                    }}
                    hover="1000"
                    message="Create a new project using Cardinal Designs!"
                    font_size="1.5vmin"
                    enabled={this.state.page_active}
                >
                    <Button 
                        name="New project" 
                        font_size="5vmin"
                        background_color={button_color}
                        font_color={button_font_color}
                        font_weight="bold"
                        on_click={() => this.start_new_project()}
                        disabled={!this.state.page_active}
                    />
                </Tooltip>
                {/* If the new project button is selected, display the new project popup */}
                {this.state.show_new_project_popup? 
                    <NewProjectPopup 
                        cancel_new_project={() => this.cancel_new_project()}
                    />
                : null}
                {/* Show the cardinal designs header */}
                <h1
                    style={{
                        color: this.text_color(this.state.page_active),
                        opacity: background_opacity
                    }}
                >
                    Cardinal designs
                    </h1> 
                <div> 
                {/* Show the cardinal designs logo */}
                <img 
                    src={logo} 
                    alt="large_logo"
                    className="launch-logo"
                    style={{ 
                        opacity: background_opacity
                    }}
                />
                </div>
            </header>
          </div>
        );
    }
}

export default LaunchPage;