class RecursivePiecingSettings {
    node_size = 0.015; // defines the diameter of each node to be this fraction of the project dimensions

    // the min/max node sizes (node_size will always be between these values)
    min_node_size = 0.0;
    max_node_size = 0.05;

    // the color of the nodes 
    node_color = getComputedStyle(document.documentElement).getPropertyValue("--black");
    active_node_color = getComputedStyle(document.documentElement).getPropertyValue("--red");
    new_node_color = getComputedStyle(document.documentElement).getPropertyValue("--blue");  

    // the line thickness and their min/max values
    line_thickness = 0.01; // defines the thickness of each line to be this fraction of the project dimensions
    min_line_thickness = 0.0;
    max_line_thickness = 0.05;

    // the color of the lines 
    line_color = getComputedStyle(document.documentElement).getPropertyValue("--black");
    active_line_color = getComputedStyle(document.documentElement).getPropertyValue("--red");
    new_line_color = getComputedStyle(document.documentElement).getPropertyValue("--blue");

    // the currently active panel (undefined indicates)
    active_panel = undefined;

    // proposed new nodes in the active panel
    new_start_node = undefined;
    new_end_node = undefined;
}

export default RecursivePiecingSettings;