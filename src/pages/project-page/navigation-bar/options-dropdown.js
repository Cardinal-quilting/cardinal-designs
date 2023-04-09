import DropdownMenu from "infrastructure/dropdown-menu";

import Button from "infrastructure/button";

/**
 * The Options dropdown menue in the navigation bar of the project page.
 */
class OptionsDropdown extends DropdownMenu {
    /**
     * @param {*} link Go to this link
     */
    #goTo(link) {
        window.location.replace(link);
    }

    /**
     * @returns The button that saves the project
     */
    save_button() {
        return (
            <Button 
                on_click={this.props.save_project} 
                name="Save"
                key="save-button"
            /> 
        );
    }

    /**
     * @returns The button that saves the project in a new file
     */
    save_as_button() {
        return (
            <Button 
                on_click={this.props.save_project_as} 
                name="Save as ..."
                key="save-as-button"
            /> 
        );
    }

    /**
     * @returns The button that takes us back to the home page
     */
    home_button() {
        return (
            <Button 
                on_click={() => this.#goTo("/")} 
                name="Home"
                key="home-button"
            /> 
        );
    }

    /**
    * @returns A list containing the content of the dropdown menu
    */
    content() {
        return [this.save_button(), 
                this.save_as_button(), 
                this.home_button()];
    }
}

export default OptionsDropdown;