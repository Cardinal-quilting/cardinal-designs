import React, { Component } from "react";

import Settings from "js/infrastructure/settings";

import LaunchPage from "js/launch-page/launch-page";
import ProjectPage from "./project-page/project-page";

// enum to decide which page to display
const PageNames = { launch_page: "launch page",
                    project_page: "project page" }

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: new Settings(),
            page: "launch page"
        }

        this.update_setting_element = this.update_setting_element.bind(this);
    }

    update_setting_element(element_name, value) {
        var new_settings = this.state.settings;
        new_settings[element_name] = value;

        this.setState({
            settings: new_settings
        });
    }

    switch_page(page_name) {
        this.setState({
            page: page_name
        });
    }

    render() { 
        if( this.state.page===PageNames.project_page ) {
            return (
                <ProjectPage
                settings={this.state.settings}
                update_setting_element={this.update_setting_element}
                go_to_launch_page={() => this.switch_page("launch page")}
                />
            );
        } else {
            return (
                <LaunchPage 
                settings={this.state.settings}
                update_setting_element={this.update_setting_element}
                start_new_project={() => this.switch_page("project page")}
                />
            );
        }
    }
}

export default HomePage;