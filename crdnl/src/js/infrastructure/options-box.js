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

    line(key_name) {
        const width = String(0.75*this.props.width)+"vw"

        return (
            <hr key={key_name}
            style={{
                border: "none",
                borderTop: "0.2vmin solid",
                borderColor: this.props.settings.accent_background_color,
                maxWidth: width,
                minWidth: width,
                opacity: 0.4
            }}
            />
        );
    }

    render() {
        const width = String(this.props.width) + "vw";
        const font_size = String(this.props.settings.small_font_size)+"vmin"

        return ( 
            <div
            style={{
                display: "grid",
                justifyContent: "left",
                textAlign: "left",
                borderWidth: "0.2vmin",
                boxSizing: "border-box",
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
                background_color={(!this.props.disabled & this.state.display)? this.props.settings.accent_background_color : this.props.settings.dark_background_color}
                disabled={this.props.disabled}
                on_click={this.toggle_display}
                >
                    {this.props.title + ((!this.props.disabled & this.state.display)? "\u25BE":"\u25B8")}
                </Button>
                </div>

                <div
                    style= {{
                        marginTop: "0.25vh",
                        marginBottom: "0.25vh"
                    }}
                >
                    {(!this.props.disabled & this.state.display)? this.content().map((d) => <li key={d.key} style={{listStyle: "none"}}>{d}</li>) : null }
                </div>
            </div>
        );
    }
}

export default OptionsBox;