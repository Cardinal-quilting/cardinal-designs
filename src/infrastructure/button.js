import { Component } from "react";

import './../styles/infrastructure/button.css';

/**
 * Defines a clickable button.
 * 
 * 
 * @prop {string} props.background_color=var(--dark-grey-background-color) - The background color of the button.
 * @prop {string} props.font_size=1.5vmin - The font size for the button's text.
 * @prop {string} props.font_weight - Set to "bold" to have a button with bold font
 * @prop {bool} props.disabled - Disable the button.
 * @prop {string} props.name - The name of the button (displayed as text).
 * @prop {function} props.on_click - What happens when the user clicks this button
 */
class ProjectButton extends Component {
    /**
     * See button.css for default options
     * @returns A wrapper around the button object
     */
    render() {
        return (
            <button className="button" 
            style={{"backgroundColor": this.props.background_color,
                    "fontSize": this.props.font_size,
                    "fontWeight": this.props.font_weight
                    }}
            onClick={() => this.props.on_click()}
            disabled={this.props.disabled}>
                {this.props.name}
            </button>
        );
    }
}

export default ProjectButton;