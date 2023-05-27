import React, { Component } from "react";

import "styles/infrastructure/options-box.css";

class OptionsBox extends Component {
    render() {
        return ( 
            <div
                className="options-box"
            >
                <div
                    className="options-title"
                >
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default OptionsBox;