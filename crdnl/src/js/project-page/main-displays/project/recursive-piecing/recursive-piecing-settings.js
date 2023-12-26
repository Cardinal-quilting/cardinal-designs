class RecursivePiecingSettings {
    node_size = 0.015; // defines the diameter of each node to be this fraction of the project dimensions

    // the min/max node sizes (node_size will always be between these values)
    min_node_size = 0.0;
    max_node_size = 0.05;

    // the color of the nodes 
    node_color = getComputedStyle(document.documentElement).getPropertyValue("--black");
}

export default RecursivePiecingSettings;