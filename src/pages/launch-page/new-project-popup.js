import { Component } from 'react';

import Button from "infrastructure/button";

import "styles/pages/launch-page/new-project-popup.css";

class NewProjectPopup extends Component {
    render() {
        return (
            <div className="new-project-popup">
                <h1
                    style = {{
                        fontSize: "100%"
                    }}
                >
                    Start new project:
                </h1>
                <Button 
                    name="Cancel"
                    font_size="5vmin"
                    font_weight="bold"
                    background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}
                    margin={{
                        x: "4vw",
                        y: "0.1vh"
                    }}
                    on_click={() => this.props.cancel_new_project()}
                />
                <Button 
                    name="Start"
                    font_size="5vmin"
                    font_weight="bold"
                    background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}
                    margin={{
                        x: "4vw",
                        y: "0.1vh"
                    }}
                    on_click={() => window.location.replace("/project")}
                />
            </div>
        );
    }
}

export default NewProjectPopup;