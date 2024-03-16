import { Component } from "react";

import Button from "js/infrastructure/button";

class TopViews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false
        }

        this.toggle_display = this.toggle_display.bind(this);
    }

    toggle_display() {
        this.setState({
            display: !this.state.display
        });
    }

    render() {
        const font_size = String(this.props.settings.small_font_size)+"vmin"

        return ( 
            <div
                style={{ 
                    minWidth: this.props.width, 
                    maxWidth: this.props.width 
                }}
            >
                <Button
                    settings={this.props.settings} 
                    font_size={font_size}
                    on_click={this.toggle_display}
                    background_color={this.state.display? this.props.settings.accent_background_color : this.props.settings.dark_background_color}
                >
                    click me {this.state.display? "\u25BE" : "\u25B8"}
                </Button>

                {!this.state.display? null : "fun"}
            </div>
        );
    }
}

export default TopViews;