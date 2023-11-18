import { Component } from "react";

import Button from "js/infrastructure/button";

class NavigationBar extends Component {
    settings_button() {
        return (
            <Button 
                settings={this.props.settings}
                on_click={this.props.toggle_display_settings_form}
                font_color={this.props.settings.greyed_out_font_color}
                font_size={String(this.props.settings.font_size)+"vh"}
                disabled={this.props.disabled}
                >
                    Settings
            </Button>
        );
    }
}

export default NavigationBar;