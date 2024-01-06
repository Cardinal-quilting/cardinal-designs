import React, { Component } from "react";

import Settings from "js/infrastructure/settings";

import LaunchPage from "js/launch-page/launch-page";
import ProjectPage from "./project-page/project-page";
import StartNewProjectPage from "./launch-project-page/start-new-project-page";
import LoadProjectPage from "./launch-project-page/load-project-page";
import SaveProjectAsPage from "./launch-project-page/save-project-as-page";

import ProjectSettings from "./project-page/main-displays/project/project-settings";
import RecursivePiecingSettings from "./project-page/main-displays/project/recursive-piecing/recursive-piecing-settings";

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

        this.switch_page = this.switch_page.bind(this);

        this.update_settings_element = this.update_settings_element.bind(this);

        this.set_project_settings = this.set_project_settings.bind(this);
        this.update_project_settings_element = this.update_project_settings_element.bind(this);

        this.set_recursive_piecing_settings = this.set_recursive_piecing_settings.bind(this);
        this.update_recursive_piecing_settings_element = this.update_recursive_piecing_settings_element.bind(this);

        this.delete_project = this.delete_project.bind(this);

        this.load_project = this.load_project.bind(this);
        this.load_project_settings = this.load_project_settings.bind(this);

        this.save_project = this.save_project.bind(this);
        this.save_main_project = this.save_main_project.bind(this);
        this.save_recursive_piecing_settings = this.save_recursive_piecing_settings.bind(this);
        this.save_recursive_piecing_nodes = this.save_recursive_piecing_nodes.bind(this);
        this.save_recursive_piecing_lines = this.save_recursive_piecing_lines.bind(this);
        this.initialize_recursive_piecing = this.initialize_recursive_piecing.bind(this);
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

    set_recursive_piecing_settings(new_settings) {
        this.setState({
            recursive_piecing_settings: new_settings
        });
    }

    update_recursive_piecing_settings_element(element_name, value) {
        var new_settings = this.state.recursive_piecing_settings;
        new_settings[element_name] = value;
        this.set_recursive_piecing_settings(new_settings);
    }

    initialize_recursive_piecing() {
        var new_settings = this.state.project_settings;
        new_settings["has_recursive_piecing"] = true;

        this.setState({
            project_settings: new_settings,
            recursive_piecing_settings: new RecursivePiecingSettings(),
            recursive_piecing_nodes: {node0: {x: 0, y: 0}, 
                                      node1: {x: 1, y: 0}, 
                                      node2: {x: 1, y: 1}, 
                                      node3: {x: 0, y: 1}},
            recursive_piecing_lines: {line0: {start: "node0", end: "node1"},
                                      line1: {start: "node1", end: "node2"},
                                      line2: {start: "node2", end: "node3"},
                                      line3: {start: "node3", end: "node0"}}
        });
    }

    switch_page(page_name) {
        if( page_name===PageNames.launch_page ) {
            this.setState({
                page: page_name,
                project_settings: undefined,
                recursive_piecing_settings: undefined,
                recursive_piecing_nodes: undefined
            });
        } else if( page_name===PageNames.start_new_project_page ) {
            this.setState({
                page: page_name,
                project_settings: new ProjectSettings(),
            });
        } else {
            this.setState({
                page: page_name,
            });
        }
    }

    load_project(project_id) {
        this.load_project_settings(project_id).then((result) => {
            return result.project_settings.has_recursive_piecing? this.load_recursive_piecing_settings(result) : result;
        }).then((result) => {
            return result.project_settings.has_recursive_piecing? this.load_recursive_piecing_nodes(result) : result;
        }).then((result) => {
            return result.project_settings.has_recursive_piecing? this.load_recursive_piecing_lines(result) : result;
        }).then((result) => {
            this.setState({
                project_settings: result.project_settings,
                recursive_piecing_settings: result.recursive_piecing_settings,
                recursive_piecing_nodes: result.recursive_piecing_nodes,
                recursive_piecing_lines: result.recursive_piecing_lines,
                page: PageNames.project_page
            });
        });
    }

    async load_recursive_piecing_settings(result) {
        return await axios.get(`http://localhost:${this.props.backend_port}/load_recursive_piecing_settings/${result.project_settings.project_id}`).then((value) => {
            result["recursive_piecing_settings"] = value.data
            return result
        });
    }

    async load_recursive_piecing_nodes(result) {
        return await axios.get(`http://localhost:${this.props.backend_port}/load_recursive_piecing_nodes/${result.project_settings.project_id}`).then((value) => {
            result["recursive_piecing_nodes"] = value.data.nodes
            return result
        });
    }

    async load_recursive_piecing_lines(result) {
        return await axios.get(`http://localhost:${this.props.backend_port}/load_recursive_piecing_lines/${result.project_settings.project_id}`).then((value) => {
            result["recursive_piecing_lines"] = value.data.lines
            return result
        });
    }

    async load_project_settings(project_id) {
        return await axios.get(`http://localhost:${this.props.backend_port}/load_project/${project_id}`).then((value) => {
            return {project_settings: value.data};
        });
    }

    async delete_project(project_id) {
        return await axios.delete(`http://localhost:${this.props.backend_port}/delete_project/${project_id}`);
    }

    save_project() {
        // this function returns a promise to save a component of the project
        const save_project_component = (save_component, project_id=undefined) => {
            return save_component(project_id).then((result) => {
                // if saving was successful, return the result
                if( result.success ) { return result; }
                // if not successful, throw the result as an error 
                throw result
            });
        }
        // save the project settings
        return save_project_component(this.save_main_project).then((result) => { 
            // save the recursive piecing settings
            return this.state.project_settings.has_recursive_piecing? 
                save_project_component(this.save_recursive_piecing_settings, result.project_id) 
                : result;
        }).then((result) => {
            // save the recursive piecing nodes 
            return this.state.project_settings.has_recursive_piecing?
                save_project_component(this.save_recursive_piecing_nodes, result.project_id) 
                : result;
        }).then((result) => {
            // save the recursive piecing lines
            return this.state.project_settings.has_recursive_piecing?
                save_project_component(this.save_recursive_piecing_lines, result.project_id) 
                : result;
        }).then((result) => {
            // since we have saved everything with a new id, delete the old project id 
            if( this.state.project_settings.project_id!==undefined ) {
                this.delete_project(this.state.project_settings.project_id);
            }

            this.update_project_settings_element("project_id", result.project_id);
            return result;
        });
    }

    async save_recursive_piecing_nodes(project_id) {
        return await axios.post(`http://localhost:${this.props.backend_port}/save_recursive_piecing_nodes/${project_id}`, this.state.recursive_piecing_nodes).then(
            (value) => {
                return value.data;
        });
    }

    async save_recursive_piecing_lines(project_id) {
        return await axios.post(`http://localhost:${this.props.backend_port}/save_recursive_piecing_lines/${project_id}`, this.state.recursive_piecing_lines).then(
            (value) => {
                return value.data;
        });
    }

    async save_recursive_piecing_settings(project_id) {
        return await axios.post(`http://localhost:${this.props.backend_port}/save_recursive_piecing_settings/${project_id}`, this.state.recursive_piecing_settings).then(
            (value) => {
                return value.data;
        });
    }

    async save_main_project() {
        return await axios.post(`http://localhost:${this.props.backend_port}/save_project/`, this.state.project_settings).then(
            (value) => {
                // if the project has been saved
                if( value.data.success ) {
                    return { success: true, project_id: value.data.project_id };
                }
                return { success: false, message: value.data.message };
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
                set_project_settings={this.set_project_settings}
                update_project_settings_element={this.update_project_settings_element}
                project_settings={this.state.project_settings}
                save_project_as={() => this.switch_page(PageNames.save_project_as_page)}
                save_project={this.save_project}
                recursive_piecing_settings={this.state.recursive_piecing_settings}
                recursive_piecing_nodes={this.state.recursive_piecing_nodes}
                recursive_piecing_lines={this.state.recursive_piecing_lines}
                initialize_recursive_piecing={this.initialize_recursive_piecing}
                set_recursive_piecing_settings={this.set_recursive_piecing_settings}
                update_recursive_piecing_settings_element={this.update_recursive_piecing_settings_element}
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
                load_project={this.load_project}
                delete_project={this.delete_project}
                backend_port={this.props.backend_port}
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