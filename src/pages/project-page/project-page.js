import React, { Component } from "react";

import NavigationBar from "pages/project-page/navigation-bar/navigation-bar";

import { EnabledState, ZIndexState } from "./project-page-state";

import Project from "projects/project";
import ProjectGrid from "./project-grid/project-grid";

import "styles/pages/project-page/project-page.css";

/**
 * The project page allows user to interact with their project.
 * @prop {bool} state.saving=true We are currently writing project data to file
 * @prop {bool} state.project We are currently working on this project
 * @prop {bool} state.project_filename The filename where we want to save the project
 * @prop {bool} state.component_enabled.navigation_bar=true Disable/enable the navigation bar
 * @prop {bool} state.component_enabled.project_display=true Disable/enable the project display
 */
class ProjectPage extends Component {
    constructor(props) {
        super(props);

        var project_info = JSON.parse(new URLSearchParams(window.location.search).get("info"));
        if( project_info.load_from_file ) {
            project_info = JSON.parse(localStorage.getItem("loadFile"));
        }    
        this.project = new Project(project_info)
        
        this.state = {
            saving: false,
            z_index: new ZIndexState(),
            project_metadata: this.project.metadata,
            project_geometry: this.project.project_geometry,
            display_state: this.project.display_state,
            project_filename: project_info.filename,
            enabled_components: new EnabledState()
        }

        this.save_project = this.save_project.bind(this);
        this.save_project_as = this.save_project_as.bind(this);

        this.navigation_menu_state = this.navigation_menu_state.bind(this);

        this.update_background_image = this.update_background_image.bind(this);
    }

    /**
     * Save the project
     */
    save_project() {
        this.save_project_as();       
        /*if (!this.state.project_filename) {
            this.save_project_as(); 
        } else {
            window.API.invoke("save_project", [this.state.project_filename, this.state.project]);
        }*/
    }

    /**
     * Save the project in a specified file
     */
    save_project_as() {
        this.setState({
            saving: true,
            component_enabled: new EnabledState(EnabledState.Options.none)
        });

        const save_to_file = async () => {
            const filename = await window.API.invoke("save_project_as", this.project.stringify());
            if (filename) { 
                this.setState({
                    saving: false,
                    project_filename: filename,
                    enabled_components: new EnabledState()
                });
            } else {
                this.setState({
                    saving: false,
                    enabled_components: new EnabledState()
                });
            }
        }
        save_to_file();
    }

    navigation_menu_state(is_open) {
        const enabled = (!is_open && !this.state.saving);
                
        this.setState({
            enabled_components: enabled? new EnabledState() : new EnabledState(EnabledState.Options.none)
        });
    }

    update_background_image(background_image) {
        this.project.display_state.background_image = background_image;
        this.setState({
            display_state: this.project.display_state
        });
    }

    update_project_geometry() {
        console.log("project-page.js UPDATE GEO");
        this.setState({
            project_geometry: this.project.project_geometry
        });
    }

    render() {
        return (
        <div className="project-body">
            {/* put a navation bar at the top of the page */}
            <NavigationBar 
                zIndex={this.state.z_index.nav_bar}
                save_project={this.save_project}
                save_project_as={this.save_project_as}
                announce_dropdown_state={this.navigation_menu_state}  
                enabled={this.state.enabled_components.navigation_bar()}
            />

            <ProjectGrid
                zIndex={this.state.z_index.project_grid}
                enabled_components={this.state.enabled_components}
                project_metadata={this.state.project_metadata}
                project_geometry={this.state.project_geometry}
                update_project_geometry={() => this.update_project_geometry()}
                display_state={this.state.display_state}
                update_background_image={this.update_background_image}
            />

            <div className="bottom-menu"
                style={{
                    zIndex: 1
                }}
            >
                DIAGNOSTIC INFORMATION
            </div>
        </div>
    )
    }
}

export default ProjectPage;