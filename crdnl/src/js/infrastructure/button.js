import React, { Component } from "react";

class Button extends Component {
    static defaultProps = {
        disabled: false,
        margin_left: "0vw",
        margin_right: "0vw",
        margin_top: "0vh",
        margin_bottom: "0vh",
        font_size: "2vh"
    }

    render() {
        const style = {
                backgroundColor: this.props.background_color===undefined? this.props.settings.background_color : this.props.background_color,
                color: this.props.font_color===undefined? this.props.settings.font_color : this.props.font_color,
                cursor: this.props.disabled? "default" : "pointer",
                borderRadius: "1vmin",
                padding: "0.1vh 0.1vw",
                marginLeft: this.props.margin_left,
                marginRight: this.props.margin_right,
                marginTop: this.props.margin_top,
                marginBottom: this.props.margin_bottom,
                fontSize: this.props.font_size
            }

        return (
            <button
            style={style}
            disabled={this.props.disabled}
            onClick={this.props.on_click}
            >
                {this.props.children}
            </button>
        );
    }
}

export default Button;