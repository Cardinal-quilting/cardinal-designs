import { Component } from "react";

import ProjectLeftMenu from "./project-left-menus/project-left-menu";
import RecursivePiecingTreeLeftMenu from "./recursive-piecing-tree-left-menus/recursive-piecing-tree-left-menu";

class LeftMenu extends Component {
    content() {
        if( this.props.project_settings.main_display==="Project" ) {
            return (
                <ProjectLeftMenu
                    settings={this.props.settings}
                    project_settings={this.props.project_settings}
                    set_project_settings={this.props.set_project_settings}
                    update_project_settings_element={this.props.update_project_settings_element}
                    width={this.props.width}
                    initialize_recursive_piecing={this.props.initialize_recursive_piecing}
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    set_recursive_piecing_settings={this.props.set_recursive_piecing_settings}
                    update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                />
            );
        }

        if( this.props.project_settings.main_display==="Recursive piecing tree" ) {
            return (
                <RecursivePiecingTreeLeftMenu
                    settings={this.props.settings}
                    width={this.props.width}
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                />
            );
        }
    }


    render() {
        const width = String(this.props.width) + "vw";
        return ( 
            <div
            style={{
                minWidth: width, 
                maxWidth: width,
                overflowY: "auto",
                overflowX: "hidden",
            }}
            >   
                {this.content()}
            </div>
        );
    }
}

export default LeftMenu;