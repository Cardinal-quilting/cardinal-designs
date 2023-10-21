import { Component } from "react";

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
}

export default Page;