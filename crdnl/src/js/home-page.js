import React, { Component } from "react";

import Settings from "js/infrastructure/settings";

import LaunchPage from "js/launch-page/launch-page";
import ProjectPage from "./project-page/project-page";

// enum to decide which page to display
const PageNames = { launch_page: "launch page",
                    project_page: "project page" }

// enum to decide how to launch a new project 
const ProjectStatus = { unknown: "unknown", // no user input, unknown launch status
                       launch_new_project: "new project", // start a new project
                       laod_project: "load project" } // launch an existing project

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: new Settings(),
            project_status: "unknown",
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

    switch_page(page_name, project_status="unknown") {
        this.setState({
            page: page_name,
            project_status: project_status
        });
    }

    render() { 
        if( this.state.page===PageNames.project_page ) {
            return (
                <ProjectPage
                settings={this.state.settings}
                update_setting_element={this.update_setting_element}
                go_to_launch_page={() => this.switch_page("launch page")}
                project_status={this.state.project_status}
                />
            );
        } else {
            return (
                <LaunchPage 
                settings={this.state.settings}
                update_setting_element={this.update_setting_element}
                start_new_project={() => this.switch_page("project page", "new project")}
                />
            );
        }
    }
}

export default HomePage;