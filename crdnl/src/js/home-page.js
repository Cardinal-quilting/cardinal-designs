import React, { Component } from "react";

import Settings from "js/infrastructure/settings";

import LaunchPage from "js/launch-page/launch-page";
import ProjectPage from "./project-page/project-page";
import StartNewProjectPage from "./launch-project-page/start-new-project-page";
import LoadProjectPage from "./launch-project-page/load-project-page";
import SaveProjectAsPage from "./launch-project-page/save-project-as-page";

import ProjectSettings from "./project-page/main-displays/project/project-settings";

import axios from "axios"; 

// enum to decide which page to display
const PageNames = { launch_page: "launch page",
                    start_new_project_page: "start new project page",
                    load_project_page: "load project page",
                    save_project_as_page: "Save project as page",
                    project_page: "project page" }

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: new Settings(),
            page: PageNames.launch_page,
        }

        this.update_settings_element = this.update_settings_element.bind(this);
        this.set_project_settings = this.set_project_settings.bind(this);
        this.update_project_settings_element = this.update_project_settings_element.bind(this);
        this.switch_page = this.switch_page.bind(this);
        this.load_project = this.load_project.bind(this);
        this.save_project = this.save_project.bind(this);
    }

    update_settings_element(element_name, value) {
        var new_settings = this.state.settings;
        new_settings[element_name] = value;

        this.setState({
            settings: new_settings,
        });
    }

    set_project_settings(new_settings) {
        this.setState({
            project_settings: new_settings
        });
    }

    update_project_settings_element(element_name, value) {
        var new_settings = this.state.project_settings;
        new_settings[element_name] = value;
        this.set_project_settings(new_settings);
    }

    switch_page(page_name) {
        if( page_name===PageNames.launch_page ) {
            this.setState({
                page: page_name,
                project_settings: undefined
            });
        } else if( page_name===PageNames.start_new_project_page ) {
            this.setState({
                page: page_name,
                project_settings: new ProjectSettings()
            });
        } else {
            this.setState({
                page: page_name,
            });
        }
    }

    async load_project(project_id) {
        await axios.get(`http://localhost:${this.props.backend_port}/load_project/${project_id}`).then((value) =>{
            this.setState({
                project_settings: value.data,
                page: PageNames.project_page
            });
        });
    }

    async save_project() {
        return await axios.post(`http://localhost:${this.props.backend_port}/save_project/`, this.state.project_settings).then(
            (value) => {
                if( value.data.success ) {
                    this.update_project_settings_element("project_id", value.data.project_id)
                    return { success: true, message: "success" };
                } else {
                    return { success: false, message: value.data.message };
                }
        });
    }

    render() { 
        if( this.state.page===PageNames.project_page ) {
            return (
                <ProjectPage
                settings={this.state.settings}
                update_settings_element={this.update_settings_element}
                go_to_launch_page={() => this.switch_page(PageNames.launch_page)}
                update_project_status={(status) => this.switch_page(PageNames.project_page, status)}
                backend_port={this.props.backend_port}
                set_project_settings={this.set_project_settings}
                update_project_settings_element={this.update_project_settings_element}
                project_settings={this.state.project_settings}
                save_project_as={() => this.switch_page(PageNames.save_project_as_page)}
                save_project={this.save_project}
                />
            );
        } else if( this.state.page===PageNames.start_new_project_page ) {
            return (
                <StartNewProjectPage
                settings={this.state.settings}
                update_settings_element={this.update_settings_element}
                go_to_launch_page={() => this.switch_page(PageNames.launch_page)}
                update_project_settings_element={this.update_project_settings_element}
                project_settings={this.state.project_settings}
                start_new_project={() => this.switch_page(PageNames.project_page)}
                />
            );
        } else if( this.state.page===PageNames.load_project_page ) {
            return (
                <LoadProjectPage
                settings={this.state.settings}
                update_settings_element={this.update_settings_element}
                go_to_launch_page={() => this.switch_page(PageNames.launch_page)}
                update_project_settings_element={this.update_project_settings_element}
                project_settings={this.state.project_settings}
                backend_port={this.props.backend_port}
                load_project={this.load_project}
                />
            );
        } else if( this.state.page===PageNames.save_project_as_page ) {
            return ( 
                <SaveProjectAsPage
                settings={this.state.settings}
                go_to_launch_page={() => this.switch_page(PageNames.launch_page)}
                return_to_project={() => this.switch_page(PageNames.project_page)}
                project_settings={this.state.project_settings}
                set_project_settings={this.set_project_settings}
                save_project={this.save_project}
                />
            );
        } else {
            return (
                <LaunchPage 
                settings={this.state.settings}
                update_settings_element={this.update_settings_element}
                start_new_project={() => this.switch_page(PageNames.start_new_project_page)}
                load_project={() => this.switch_page(PageNames.load_project_page)}
                />
            );
        }
    }
}

export default HomePage;