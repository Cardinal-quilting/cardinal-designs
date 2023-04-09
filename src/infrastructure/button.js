import { Component } from "react";

import "styles/infrastructure/button.css";

/**
 * Defines a clickable button.
 * 
 * 
 * @prop {string} props.background_color=var(--dark-grey-background-color) - The background color of the button.
 * @prop {string} props.font_size=1.5vmin - The font size for the button's text.
 * @prop {string} props.font_weight - Set to "bold" to have a button with bold font
 * @prop {bool} props.enabled=true - Enable/disable the button.
 * @prop {string} props.name - The name of the button (displayed as text).
 * @prop {function} props.on_click - What happens when the user clicks this button
 * @prop {string} props.margin.x="0.1vw" - The x direction margin
 * @prop {string} props.margin.y="0.1vh" - The y direction margin
 */
class Button extends Component {
    static defaultProps = {
        background_color: getComputedStyle(document.documentElement).getPropertyValue("--dark-grey-background-color"),
        font_color: getComputedStyle(document.documentElement).getPropertyValue("--light-font-color"),
        font_size: "1.5vmin",
        font_weight: "",
        margin: {
            x: "0.1vw",
            y: "0.1vh",
        },
        enabled: true
    }
    
    /**
     * See button.css for default options
     * @returns A wrapper around the button object
     */
    render() {
        return (
            <button className="button" 
            style={{"backgroundColor": this.props.background_color,
                    "fontSize": this.props.font_size,
                    "fontWeight": this.props.font_weight,
                    "color": this.props.font_color,
                    "margin": this.props.margin.y+" "+this.props.margin.x
                    }}
            onClick={this.props.on_click}
            disabled={!this.props.enabled}>    
                {this.props.name}
                {this.props.children}
            </button>
        );
    }
}

export default Button;