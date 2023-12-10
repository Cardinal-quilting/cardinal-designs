import { Component } from "react";

import PopUp from "js/infrastructure/pop-up";

import SettingsForm from "js/infrastructure/settings-form";

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display_settings_form: false,
        }

        this.toggle_display_settings_form = this.toggle_display_settings_form.bind(this);
    }

    toggle_display_settings_form(form_status=undefined) {
        this.setState({
            display_settings_form: form_status===undefined? !this.state.display_settings_form : form_status
        })
    }

    background_color() {
        return this.state.display_settings_form? this.props.settings.dark_background_color : this.props.settings.background_color;
    }

    render_settings() {
        return (
            <PopUp
            settings={this.props.settings}
            background_color={this.props.settings.background_color}
            close_popup={() => this.toggle_display_settings_form(false)}
            >
                <SettingsForm 
                settings={this.props.settings}
                update_settings_element={this.props.update_settings_element}
                />
            </PopUp>
        );
    }    
}

export default Page;