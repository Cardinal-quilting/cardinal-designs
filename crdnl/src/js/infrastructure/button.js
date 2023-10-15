import React, { Component } from "react";

class Button extends Component {
    static defaultProps = {
        disabled: false
    }

    render() {
        return (
            <button
            style={{
                backgroundColor: this.props.background_color===undefined? this.props.settings.background_color : this.props.background_color,
                color: this.props.font_color===undefined? this.props.settings.font_color : this.props.font_color,
                cursor: this.props.disabled? "default" : "pointer",
                borderRadius: "1vmin",
                padding: "0.1vh 0.1vw"
            }}
            disabled={this.props.disabled}
            onClick={this.props.on_click}
            >
                {this.props.children}
            </button>
        );
    }
}

export default Button;