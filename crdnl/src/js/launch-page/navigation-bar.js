import React, { Component } from "react";

import Button from "js/infrastructure/button";

class NavigationBar extends Component {
    render() { 
        return (
            <div className="navigation-bar"
            style={{
                textAlign: "right",
                backgroundColor: this.props.background_color,
                color: this.props.settings.font_color
            }}
            >
                {this.props.disabled? null :
                <Button 
                settings={this.props.settings}
                on_click={this.props.toggle_display_settings_form}
                font_color={this.props.settings.greyed_out_font_color}
                disabled={this.props.disabled}
                >
                    Settings
                </Button>}
            </div>
        );
    }
}

export default NavigationBar;