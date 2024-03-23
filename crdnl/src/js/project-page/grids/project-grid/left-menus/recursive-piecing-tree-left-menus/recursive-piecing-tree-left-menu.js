import { Component } from "react";

import TreeSettingsOptionsBox from "./tree-settings-options-box";

class RecursivePiecingTreeLeftMenu extends Component {
    render() {
        return (
            <div
                style={{
                    maxWidth: String(this.props.width)+"vw",
                    minWidth: String(this.props.width)+"vw",
                }}
            >
                <TreeSettingsOptionsBox
                    settings={this.props.settings}
                    title="Tree settings"
                    recursive_piecing_settings={this.props.recursive_piecing_settings}
                    update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                />
            </div>
        );
    }
}

export default RecursivePiecingTreeLeftMenu;