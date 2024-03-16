import { Component } from "react";

import ActivePanelOptionsBox from "./active-recursive-piecing-panel-options-box";

class RecursivePiecingRightMenu extends Component {
    render() {
        return (
            <div>
                {this.props.recursive_piecing_settings.active_panel!==undefined?
                <ActivePanelOptionsBox
                title="Active paper piecing panel"
                width={0.95*this.props.width}
                settings={this.props.settings}
                recursive_piecing_settings={this.props.recursive_piecing_settings}
                update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                split_active_recursive_piecing_panel={this.props.split_active_recursive_piecing_panel}
                />
                : null}
            </div>
        );
    }
}

export default RecursivePiecingRightMenu;