import React from 'react';

import Button from "infrastructure/button";
import Popup from "infrastructure/popup";

import "styles/pages/launch-page/new-project-popup.css";

/**
 * A popup window that gets the information required to start a new project.
 * @prop {string} state.aspect_ratio - The aspect ratio of the new project (width/height)
 */
class NewProjectPopup extends Popup {
    constructor(props) {
        super(props);

        this.state = {
            project_parameters: {
                aspect_ratio: 1.0
            }
        }
        
        this.update_aspect_ratio = this.update_aspect_ratio.bind(this);
    }

    /**
     * @param {} event The even of the user typing into the aspect ratio text input
     */
    update_aspect_ratio(event) {
        // get what the user has typed
        var val = event.target.value
        // if the new value is not a number, do nothing
        if( isNaN(val) ) {
            return;
        }

        // set the new state to the new number
        this.setState({
            project_parameters: {
                aspect_ratio: val
            }
        });
    }

    /** 
     * @returns The JSX to get the aspect ratio from the user
     */
    form_inputs() {
        return (
            <div className="text-input-wrapper">
                <label>Aspect ratio:</label>
            
                <input 
                    className="text-input"
                    type="text" 
                    value={this.state.project_parameters.aspect_ratio} 
                    onChange={this.update_aspect_ratio}
                />
            </div>
            );
    }

    /**
     * Get the project information and launch the new project.
     */
    start_project() {
        window.location.href = `/project`;
    }

    /**
     * @returns The JSX for the object that submits the form 
     */
    submit() {
        return (
            <Button 
                name="Start"
                font_size="5vmin"
                font_weight="bold"
                background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}
                on_click={this.start_project}
                margin={{
                    x: "5vw",
                    y: "1vh"
                }}
                key="start-button"
            />
        );
    }
}

export default NewProjectPopup;