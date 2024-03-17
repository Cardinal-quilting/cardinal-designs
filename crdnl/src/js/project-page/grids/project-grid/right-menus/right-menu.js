import { Component } from "react";

import RecursivePiecingRightMenu from "./recursive-piecing-right-menu";

class RightMenu extends Component {
    content() {
        if( this.props.project_settings.main_display==="Project" ) {
            return (
                <div>
                    {this.props.project_settings.has_recursive_piecing? <RecursivePiecingRightMenu
                        settings={this.props.settings}
                        width={this.props.width}
                        recursive_piecing_settings={this.props.recursive_piecing_settings}
                        update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                        split_active_recursive_piecing_panel={this.props.split_active_recursive_piecing_panel}
                    /> : null}
                </div>
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

export default RightMenu;