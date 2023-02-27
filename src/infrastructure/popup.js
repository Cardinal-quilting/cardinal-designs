import React, { Component } from "react";

import Button from "infrastructure/button";
import Form from "infrastructure/form";

import "styles/infrastructure/popup.css";

/**
 * Children of this class are popup windows.
 * @prop {string} props.title - The title of the popup window
 * @prop {function} props.cancel_popup - Close the popup window
 */
class Popup extends Component {
    constructor(props) {
        super(props);

        this.box = React.createRef();
        this.handle_outside_click = this.handle_outside_click.bind(this);
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
            this.props.cancel_popup();
        }
    }

    /**
     * @returns The JSX for the button that cancels the popup
     */
    cancel_button() {
        return (
            <Button 
                name="Cancel"
                font_size="5vmin"
                font_weight="bold"
                background_color={getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme")}
                on_click={this.props.cancel_popup}
                margin={{
                    x: "5vw",
                    y: "1vh"
                }}
                key="cancel-button"
            />
        );
    }

    /**
     * Must be overriden by children
     * @returns The JSX for the object that submits the form 
     */
    submit() {
        return []
    }

    /**
     * @returns The JSX for the title/name of the popup window
     */
    popup_title() {
        return (
            <h1
                style = {{
                    fontSize: "100%",
                    margin: "0vh 0vw"
                }}
                key = "popup-title"
            >
                {this.props.title}
            </h1>
        );
    }

    /**
     * Must be overriden by children
     * @returns Objects to display in the form
     */
    form_inputs() {
        return [];
    }

    /**
     * @returns The JSX for a form that gets information from the user
     */
    input_form() {
        return ( 
            <Form key="input-form">
                {this.form_inputs()}
            </Form>
        );
    }

    /** 
     * @returns The JSX definition of the popup window
    */
    render() {  
        let buffer = []

        // the title of the popup window
        buffer.push(this.popup_title());

        // the form that takes input from the user 
        buffer.push(this.input_form());

        // add the cancel and submit buttons
        buffer.push(
            <div 
                key="cancel_submit"
                style={{
                    margin: "1vh 0vw",
                }}                
            >
                {[this.cancel_button(), this.submit()]}
            </div>);

        return (<div className="popup" ref={this.box}>
            {buffer}
        </div>);
    }
}

export default Popup;