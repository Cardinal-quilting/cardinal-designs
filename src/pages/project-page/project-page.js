import React, { Component } from "react";

import ProjectDisplay from 'pages/project-page/project-display/project-display';

import NavigationBar from 'pages/project-page/navigation-bar/navigation-bar';

import Project from 'projects/project';

import 'styles/pages/project-page/project-page.css';

/**
 * The project page allows user to interact with their project.
 * @prop {bool} state.navigation_menu_open=false True: The navigation bar has a menu option, False: the navigation bar does not have a menu open
 * @prop {bool} state.component_enabled.navigation_bar=true Disable/enable the navigation bar
 */
class ProjectPage extends Component {
    constructor(props) {
        super(props);

        const project_info = JSON.parse(new URLSearchParams(window.location.search).get("info"));

        this.state = {
            saving: false,
            project: new Project(project_info),
            component_enabled: {
                navigation_bar: true,
                project_display: true
            }
        }

        this.save_project = this.save_project.bind(this);
        this.save_project_as = this.save_project_as.bind(this);
        this.navigation_menu_state = this.navigation_menu_state.bind(this);
    }

    /**
     * Save the project
     */
    save_project() {
        if (!this.state.project_filename) {
            this.save_project_as();        
        } else {
            window.API.invoke("save_project", [this.state.project_filename, this.state.project]);
        }
    }

    /**
     * Save the project in a specified file
     */
    save_project_as() {
        this.setState({
            saving: true,
            component_enabled: {
                navigation_bar: false,
                project_display: false
            }
        });

        const save_to_file = async () => {
            const filename = await window.API.invoke("save_project_as", this.state.project);
            if (filename) { 
                this.setState({
                    saving: false,
                    project_filename: filename,
                    component_enabled: {
                        navigation_bar: true,
                        project_display: true
                    }
                });
            } else {
                this.setState({
                    saving: false,
                    component_enabled: {
                        navigation_bar: true,
                        project_display: true
                    }
                });
            }
        }
        save_to_file();
    }

    navigation_menu_state(is_open) {
        const enabled = !is_open & !this.state.saving;

        this.setState({
            component_enabled: {
                navigation_bar: enabled,
                project_display: enabled
           }
        });
    }

    render() {
        return (
        <div className="Project-body">
            {/* put a navation bar at the top of the page */}
            <NavigationBar 
                save_project={this.save_project}
                save_project_as={this.save_project_as}
                announce_dropdown_state={this.navigation_menu_state}  
                enabled={this.state.component_enabled.navigation_bar}
            />
        
            <div className="top-menu">
                VIEWS
            </div>        
            <div className="row">
            <div className="left-menu">
                PROJECT MODES
            </div>
            <ProjectDisplay
                enabled={this.state.component_enabled.project_display}
            />
            <div className="right-menu">
                LOCAL OPTIONS
            </div>
            </div>        
            <div className="bottom-menu">
                DIAGNOSTIC INFORMATION
            </div>
        </div>
    )
    }
}

export default ProjectPage;