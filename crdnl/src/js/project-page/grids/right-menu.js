import { Component } from "react";

import RecursivePiecingRightMenu from "../main-displays/project/recursive-piecing/recursive-piecing-right-menu";

class RightMenu extends Component {
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
                {this.props.project_settings.has_recursive_piecing?
                    <RecursivePiecingRightMenu
                    settings={this.props.settings}
                    width={this.props.width}
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                    /> : null
                }
            </div>
        );
    }
}

export default RightMenu;