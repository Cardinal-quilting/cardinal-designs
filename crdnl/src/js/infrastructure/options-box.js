import { Component } from "react";

import Button from "js/infrastructure/button";

class OptionsBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false
        }

        this.toggle_display = this.toggle_display.bind(this);
    }

    static defaultProps = {
        disabled: false
    }

    content() {
        return [];
    }

    toggle_display() {
        this.setState({
            display: !this.state.display
        });
    }

    render() {
        const width = String(0.98*this.props.width) + "vw";
        const font_size = String(this.props.settings.small_font_size)+"vmin"

        return ( 
            <div
            style={{
                display: "grid",
                justifyContent: "left",
                textAlign: "left",
                borderWidth: "0.1vw",
                borderStyle: ((!this.props.disabled & this.state.display)? "solid" : "none"),
                borderColor: this.props.settings.accent_background_color,
                borderRadius: "0.5vmin",
                minWidth: width, 
                maxWidth: width,
            }}
            >
                <div>
                <Button 
                settings={this.props.settings} 
                font_size={font_size}
                background_color={this.props.settings.dark_background_color}
                disabled={this.props.disabled}
                on_click={this.toggle_display}
                >
                    {this.props.title + ((!this.props.disabled & this.state.display)? "\u25BE":"\u25B8")}
                </Button>
                </div>

                {(!this.props.disabled & this.state.display)? this.content().map((d) => <li key={d.key} style={{listStyle: "none"}}>{d}</li>) : null }
            </div>
        );
    }
}

export default OptionsBox;