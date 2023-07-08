import React, { Component } from "react";

import Button from "./button";

import "styles/infrastructure/options-box.css";

class OptionsBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: false
        }

        this.change_display_status = this.change_display_status.bind(this);
    }

    content() {
        return [];
    }

    change_display_status() {
        this.setState({
            display: !this.state.display
        });
    }

    render() {
        return ( 
            <div
                className="options-box"
                style={{
                    borderStyle: (this.props.enabled & this.state.display)? "solid" : "none"
                }}
            >
                <Button
                    font_size={this.props.title_font_size}
                    font_weight="bold"
                    on_click={this.change_display_status}
                    enabled={this.props.enabled}
                >
                    {this.props.title + ((this.props.enabled & this.state.display)? "\u25BE":"\u25B8")}
                </Button>
                {(this.props.enabled & this.state.display)? this.content().map((d) => <li key={d.key} style={{listStyle: "none"}}>{d}</li>) : null }
            </div>
        );
    }
}

export default OptionsBox;