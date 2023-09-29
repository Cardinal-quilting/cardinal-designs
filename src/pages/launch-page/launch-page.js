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

        console.log("lanch-page.js"); 

        this.state = {
            page_active: true,
            show_new_project_popup: false
        };

        this.start_new_project = this.start_new_project.bind(this);
        this.load_project = this.load_project.bind(this);
        this.load_project_button = this.load_project_button.bind(this);

        this.load_project_ref = React.createRef();
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

    load_project_button() {
        this.load_project_ref.current.click();
    }

    /**
     * Display tbhe popup window to load an existing project.
     */
    load_project(event) {
        if( event.target.files.length===0 ) {
            return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
            localStorage.setItem("loadFile", reader.result);
            const info = { load_from_file: true }
            window.location.href = `/project?info=${JSON.stringify(info)}`;
        };
        reader.readAsText(event.target.files[0]);
    }

    /**
     * Remove the popup window to start a new poject.
     */
    cancel_popup() {
        this.setState({
            page_active: true,
            show_new_project_popup: false,
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
                <div style={{display: "flex",
                             flexDirection: "row"}}>
                {/* Load an existing project */}
                <Tooltip 
                    pos={{
                        x: "5vw",
                        y: "-2vh"
                    }}
                    hover="1000"
                    message="Load a saved Cardinal Designs project"
                    font_size="1.5vmin"
                    enabled={this.state.page_active}
                >
                    <input 
                        type="file" 
                        accept=".crdnl"
                        ref={this.load_project_ref}
                        style={{ display: "none" }}
                        onChange={this.load_project}
                    />
                    <Button 
                        name="Load project" 
                        font_size="5vmin"
                        background_color={button_color}
                        font_color={button_font_color}
                        font_weight="bold"
                        on_click={this.load_project_button}
                        disabled={!this.state.page_active}
                        margin={{x: "2.0vw",
                                 y: "0.0vh"}}
                    />
                </Tooltip>
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
                        margin={{x: "2.0vw",
                                 y: "0.0vh"}}
                    />
                </Tooltip>
                </div>
                {/* If the new project button is selected, display the new project popup */}
                {this.state.show_new_project_popup? 
                    <NewProjectPopup 
                        cancel_popup={() => this.cancel_popup()}
                        title="Start new project:"
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
                    alt="large logo"
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