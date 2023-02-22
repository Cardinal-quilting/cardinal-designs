import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from "infrastructure/button";

import "styles/pages/launch-page/new-project-popup.css";

/**
 * A popup window that gets the information required to start a new project.
 * @prop {string} props.cancel_new_project - Close the popup window
 * @prop {string} state.aspect_ratio - The aspect ratio of the new project (width/height)
 */
class NewProjectPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project_parameters: {
                aspect_ratio: 1.0
            }
        }

        this.box = React.createRef();
        this.handle_outside_click = this.handle_outside_click.bind(this);
        this.update_aspect_ratio = this.update_aspect_ratio.bind(this);
    }

    /**
     * When the component is mounted, add a listener that handles when we click outside of the mune.
     */
    componentDidMount() {
        document.addEventListener("click", this.handle_outside_click, true);    
    }

    /**
     * Remove the event listener that handles outside click with the component unmounts.
     */
    componentWillUnmount(){
        document.removeEventListener("click", this.handle_outside_click, true);
    }

    /**
     * Close the popupwindow if it is open and the user clicks outside
     * @param {*} event Information about the click.
     */
    handle_outside_click(event) {
        if( this.box.current && !this.box.current.contains(event.target) ) {
            this.props.cancel_new_project();
        }
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
     * @returns The definition of the new project popup window
    */
    render() {
        return (
            <div 
                className="new-project-popup"
                ref={this.box}
            >
                <h1
                    style = {{
                        fontSize: "100%",
                        margin: "0vh 0vw"
                    }}
                >
                    Start new project:
                </h1>
                <form className="input-form">
                    <div className="text-input-wrapper">
                    <label>Aspect ratio:</label>
                    
                    <input 
                        className="text-input"
                        name="HIIRW"
                        type="text" 
                        value={this.state.project_parameters.aspect_ratio} 
                        onChange={this.update_aspect_ratio}
                    />
                    </div>
                </form>
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
                <Link to="/project" state={JSON.stringify(this.state.project_parameters)}>
                <Button 
                    name="Start"
                    font_size="5vmin"
                    font_weight="bold"
                    background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}
                    margin={{
                        x: "4vw",
                        y: "0.1vh"
                    }}                    
                />
                </Link>
            </div>
        );
    }
}

export default NewProjectPopup;