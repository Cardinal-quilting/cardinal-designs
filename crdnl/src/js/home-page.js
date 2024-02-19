import React, { Component } from "react";

import Settings from "js/infrastructure/settings";

import LaunchPage from "js/launch-page/launch-page";
import ProjectPage from "./project-page/project-page";
import StartNewProjectPage from "./launch-project-page/start-new-project-page";
import LoadProjectPage from "./launch-project-page/load-project-page";
import SaveProjectAsPage from "./launch-project-page/save-project-as-page";

import ProjectSettings from "./project-page/main-displays/project/project-settings";
import RecursivePiecingSettings from "./project-page/main-displays/project/recursive-piecing/recursive-piecing-settings";

import { initialize_recursive_piecing_containers } from "./project-page/main-displays/project/recursive-piecing/recursive-piecing-geometry";

import { RecursivePiecingNodeContainer, RecursivePiecingLineContainer, RecursivePiecingPanelContainer } from "./project-page/main-displays/project/recursive-piecing/recursive-piecing-geometry";

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
        this.split_active_recursive_piecing_panel = this.split_active_recursive_piecing_panel.bind(this);

        this.delete_project = this.delete_project.bind(this);

        this.load_project = this.load_project.bind(this);
        this.load_project_settings = this.load_project_settings.bind(this);

        this.save_project = this.save_project.bind(this);
        this.save_main_project = this.save_main_project.bind(this);
        this.save_recursive_piecing_settings = this.save_recursive_piecing_settings.bind(this);
        this.save_recursive_piecing_nodes = this.save_recursive_piecing_nodes.bind(this);
        this.save_recursive_piecing_lines = this.save_recursive_piecing_lines.bind(this);
        this.save_recursive_piecing_panels = this.save_recursive_piecing_panels.bind(this);
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

        const [node_container, line_container, panel_container] = initialize_recursive_piecing_containers();
        
        this.setState({
            project_settings: new_settings,
            recursive_piecing_settings: new RecursivePiecingSettings(),
            // store references to the containers
            recursive_piecing_nodes: node_container, 
            recursive_piecing_lines: line_container, 
            recursive_piecing_panels: panel_container
        });
    }

    split_active_recursive_piecing_panel() {
        const start_node = this.state.recursive_piecing_nodes.add_node(this.state.recursive_piecing_settings.new_start_node.point.x,
                                                                       this.state.recursive_piecing_settings.new_start_node.point.y);
        const end_node = this.state.recursive_piecing_nodes.add_node(this.state.recursive_piecing_settings.new_end_node.point.x,
                                                                     this.state.recursive_piecing_settings.new_end_node.point.y);
        
        // split the nodes into left and right
        const new_line = this.state.recursive_piecing_lines.add_line(start_node, end_node);

        const normal_vec = new_line.normal_vector(), midpoint = new_line.midpoint();
        const active_panel = this.state.recursive_piecing_settings.active_panel;

        // make a list of left and right nodes for the subpanels
        var left_nodes = [start_node, end_node], 
            right_nodes = [start_node, end_node];
        active_panel.nodes.forEach(node => {
            const diffx = node.x - midpoint.x, diffy = node.y - midpoint.y;
            const dot = diffx*normal_vec.x + diffy*normal_vec.y

            if( dot<0.0 ) {
                left_nodes = [node, ...left_nodes];
            } else {
                right_nodes = [node, ...right_nodes];
            }
        });

        const line_on_left = (line) => {
            const line_midpoint = line.midpoint();
            const diffx = line_midpoint.x - midpoint.x, diffy = line_midpoint.y - midpoint.y;

            const dot = diffx*normal_vec.x + diffy*normal_vec.y
            return dot<0.0
        }

        const split_line = (line, node) => {
            const start_line = this.state.recursive_piecing_lines.add_line(node, line.start), 
                  end_line = this.state.recursive_piecing_lines.add_line(node, line.end);

            if( line_on_left(start_line) ) {
                left_lines = [start_line, ...left_lines];
                right_lines = [end_line, ...right_lines];
            } else {
                left_lines = [end_line, ...left_lines];
                right_lines = [start_line, ...right_lines];
            }

            line.leaf_line = false;
        }

        // make a list of left and right lines for the subpanels
        var left_lines = [new_line], right_lines = [new_line];
        const start_index = parseInt(this.state.recursive_piecing_settings.new_start_node.active_index), 
              end_index = parseInt(this.state.recursive_piecing_settings.new_end_node.active_index);
        active_panel.lines.forEach((line, index) => {
            if( start_index===index ) {
                split_line(line, start_node);
                return;
            }
            if( end_index===index ) {
                split_line(line, end_node);
                return;
            }

            if( line_on_left(line) ) {
                left_lines = [line, ...left_lines];
            } else {
                right_lines = [line, ...right_lines];
            }
        });

        const left_panel = this.state.recursive_piecing_panels.add_panel(left_nodes, left_lines),
              right_panel = this.state.recursive_piecing_panels.add_panel(right_nodes, right_lines);

        active_panel.split(left_panel, right_panel, new_line);

        var new_settings = this.state.recursive_piecing_settings;
        new_settings["new_start_node"] = undefined;
        new_settings["new_end_node"] = undefined;
        new_settings["active_panel"] = undefined;

        this.setState({
            recursive_piecing_settings: new_settings,
            recursive_piecing_nodes: this.state.recursive_piecing_nodes,
            recursive_piecing_lines: this.state.recursive_piecing_lines,
            recursive_piecing_panels: this.state.recursive_piecing_panels
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
            return result.project_settings.has_recursive_piecing? this.load_recursive_piecing_panels(result) : result;
        }).then((result) => {
            // add the nodes into a container 
            var nodes = new RecursivePiecingNodeContainer(result.recursive_piecing_settings.next_node_id);
            nodes.add_nodes(result.recursive_piecing_nodes);

            // add the lines into a container
            var lines = new RecursivePiecingLineContainer(result.recursive_piecing_settings.next_line_id);
            lines.add_lines(result.recursive_piecing_lines, nodes);

            // add the panls into a container
            var panels = new RecursivePiecingPanelContainer(result.recursive_piecing_settings.next_panel_id);
            result.recursive_piecing_settings.active_panel = panels.add_panels(result.recursive_piecing_panels, nodes, lines);

            this.setState({
                project_settings: result.project_settings,
                recursive_piecing_settings: result.recursive_piecing_settings,
                recursive_piecing_nodes: nodes,
                recursive_piecing_lines: lines,
                recursive_piecing_panels: panels,
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

    async load_recursive_piecing_panels(result) {
        return await axios.get(`http://localhost:${this.props.backend_port}/load_recursive_piecing_panels/${result.project_settings.project_id}`).then((value) => {
            result["recursive_piecing_panels"] = value.data.panels
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
            // save the recursive piecing panels
            return this.state.project_settings.has_recursive_piecing?
                save_project_component(this.save_recursive_piecing_panels, result.project_id) 
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
        return await axios.post(`http://localhost:${this.props.backend_port}/save_recursive_piecing_nodes/${project_id}`, this.state.recursive_piecing_nodes.nodes).then(
            (value) => {
                return value.data;
        });
    }

    async save_recursive_piecing_lines(project_id) {
        return await axios.post(`http://localhost:${this.props.backend_port}/save_recursive_piecing_lines/${project_id}`, this.state.recursive_piecing_lines.lines).then(
            (value) => {
                return value.data;
        });
    }

    async save_recursive_piecing_panels(project_id) {
        // we don't want to send a bunch of copies of the panels, so go through and replace references with names
        var panels = {}
        Object.values(this.state.recursive_piecing_panels.panels).forEach(panel => {
            var compressed_panel = {
                name: panel.name,
                nodes: panel.nodes.map(n => {return n.name}),
                lines: panel.lines.map(l => {return l.name}),
            }

            if( panel.has_children() ) {
                compressed_panel.left_panel = panel.left_panel.name
                compressed_panel.right_panel = panel.right_panel.name
                compressed_panel.split_line = panel.split_line.name
            }

            panels[panel.name] = compressed_panel;
        });

        const data = { 
            panels: panels, 
            top_panel_name: this.state.recursive_piecing_panels.top_panel.name
        }

        if( this.state.recursive_piecing_settings.active_panel!==undefined && this.state.recursive_piecing_settings.active_panel!==null ) {
            data.active_panel_name = this.state.recursive_piecing_settings.active_panel.name;
        }
        
        return await axios.post(`http://localhost:${this.props.backend_port}/save_recursive_piecing_panels/${project_id}`, data).then(
            (value) => {
                return value.data;
        });
    }

    async save_recursive_piecing_settings(project_id) {
        var recursive_piecing_info = this.state.recursive_piecing_settings;
        recursive_piecing_info["next_node_id"] = this.state.recursive_piecing_nodes.next_node_id;
        recursive_piecing_info["next_line_id"] = this.state.recursive_piecing_lines.next_line_id;
        recursive_piecing_info["next_panel_id"] = this.state.recursive_piecing_panels.next_panel_id;

        return await axios.post(`http://localhost:${this.props.backend_port}/save_recursive_piecing_settings/${project_id}`, recursive_piecing_info).then(
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
                recursive_piecing_panels={this.state.recursive_piecing_panels}
                initialize_recursive_piecing={this.initialize_recursive_piecing}
                set_recursive_piecing_settings={this.set_recursive_piecing_settings}
                update_recursive_piecing_settings_element={this.update_recursive_piecing_settings_element}
                split_active_recursive_piecing_panel={this.split_active_recursive_piecing_panel}
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
                delete_project={this.delete_project}
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