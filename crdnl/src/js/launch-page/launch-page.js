import React, { Component } from "react";

import Settings from "js/infrastructure/settings";

import logo from "logos/CardinalQuiltsLogo.png"

import "css/styles.css";
import "css/launch-page/launch-page.css"

class LaunchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: Settings
        }
    }
    render() {
        return (
            <div>
                <div>
                    This is a navigation bar!
                </div>
            
        <header className="launch-page"
        style={{
            backgroundColor: this.state.settings.background_color,
            color: this.state.settings.font_color
        }}
        >
            <img src={logo} className="logo" alt="logo" />

            <p>
                Welcome to Cardinal Designs!
            </p>
        </header>
        </div>
        );
    }
}

export default LaunchPage;