// these objects help organize the state of the project page

/**
 * Organize which components are enabled
 */
export class EnabledState {
    static Options = {
        all: Symbol("all"),
        none: Symbol("none")
    }

    constructor(option = EnabledState.Options.all) {
        this.option = option;
    }

    navigation_bar() {
        if( this.option===EnabledState.Options.all ) {
            return true;
        } 
        return false;
    }

    project_display() {
        if( this.option===EnabledState.Options.all ) {
            return true;
        } 
        return false;
    }

    
}

/**
 * Organize the zIndex of the project page.
 */
export class ZIndexState {
    // the z index of the navigation bar
    nav_bar = 3

    project_grid = {
        // the z index of the views 
        views: 2,

        // the z index of the menus 
        menus: 2,

        // the z index of the project display
        project_display: {
            min: 0,
            max: 1
        }
    }
}