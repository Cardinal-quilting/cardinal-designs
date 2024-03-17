import { Component } from "react";

import MainDisplayViews from "./main-display-views";

class TopViews extends Component {
    render() {
        const center_width = String(this.props.width) + "vw";

        return ( 
            <div
                style={{ 
                    minWidth: center_width,
                    maxWidth: center_width,
                    zIndex: this.props.z_index
                }}
            >
                <MainDisplayViews
                    settings={this.props.settings}
                    width={this.props.width/5.0}
                    display_options={this.props.display_options}
                    main_display={this.props.project_settings.main_display}
                    update_project_settings_element={this.props.update_project_settings_element}
                    title="Views"
                />
            </div>
        );
    }
}

export default TopViews;