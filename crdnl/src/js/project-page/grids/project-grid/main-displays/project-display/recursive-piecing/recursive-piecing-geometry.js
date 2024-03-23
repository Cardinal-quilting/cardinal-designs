export class RecursivePiecingNodeContainer {
    constructor(next_node_id = 0) {
        this.nodes = {};
        this.next_node_id = next_node_id;
    }

    add_node(x, y) {
        const name = `node${this.next_node_id++}`;

        const node = new RecursivePiecingGeometricNode(x, y, name);
        this.nodes[name] = node;

        return node;
    }

    add_nodes(nodes) {
        Object.values(nodes).forEach(node => {
            this.nodes[node.name] = new RecursivePiecingGeometricNode(node.x, node.y, node.name);
        });
    }
}

export class RecursivePiecingGeometricNode {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

export class RecursivePiecingLineContainer {
    constructor(next_line_id = 0) {
        this.lines = {};
        this.next_line_id = next_line_id;
    }

    add_line(start, end) {
        const name = `line${this.next_line_id++}`;

        const line = new RecursivePiecingGeometricLine(start, end, name);
        this.lines[name] = line;

        return line;
    }

    add_lines(lines, node_container) {
        Object.values(lines).forEach(line => {
            this.lines[line.name] = new RecursivePiecingGeometricLine(node_container.nodes[line.start], node_container.nodes[line.end], line.name);
        });
    }
}

export class RecursivePiecingGeometricLine {
    constructor(start, end, name, leaf_line=true) {
        this.start = start;
        this.end = end;
        this.name = name;

        // is this a line associated with a leaf node
        this.leaf_line = leaf_line;
    }

    midpoint() {
        return {x: 0.5*(this.start.x + this.end.x), y: 0.5*(this.start.y + this.end.y) }
    }

    normal_vector() {
        const diffx = this.start.x - this.end.x, diffy = this.start.y - this.end.y;
        const norm = Math.sqrt(diffx*diffx + diffy*diffy);
        return {x: -diffy/norm, y: diffx/norm}
    }
}

export class RecursivePiecingPanelContainer {
    constructor(next_panel_id = 0) {
        this.panels = {}
        this.next_panel_id = next_panel_id;
    }

    recursive_piecing_tree() {
       /*
        Get an object that maps each layer of a binary tree to a list of paenls in that layer. 
        They are ordered from left most panel (always take the left paenl given a parent) to the 
        right most panel. (always take the right panel given a parent). Adjacent nodes (i, i+1) have 
        the same parent if i is even.
       */
       var panels_per_level = {};

       // recursively add panels to each list 
       const add_panel = (panel, level) => {
        if( panels_per_level[level]===undefined ) {
            panels_per_level[level] = [panel];
        } else {
            panels_per_level[level].push(panel);
        }

        if( panel.left_panel!==undefined ) {
            add_panel(panel.left_panel, level+1);
        }
        if( panel.right_panel!==undefined ) {
            add_panel(panel.right_panel, level+1);
        }
       };

       // add the top panel and all of its children
       add_panel(this.top_panel, 0);

       // make a list of the number of panels per level
       panels_per_level.num_panels_per_level = Object.values(panels_per_level).map(value => value.length);

       // get the number of level 
       panels_per_level.num_levels = panels_per_level.num_panels_per_level.length;

       // determine the level with the most panels
       panels_per_level.widest_level = panels_per_level.num_panels_per_level.indexOf(Math.max(...panels_per_level.num_panels_per_level));

       return panels_per_level;
    }

    add_panel(nodes, lines) {
        const name = `panel${this.next_panel_id++}`;

        const panel = new RecursivePiecingGeometricPanel(nodes, lines, name);
    
        // set the top panel of a binary tree
        if( Object.keys(this.panels).length===0 ) {
            this.top_panel = panel;
        }

        this.panels[name] = panel;

        return panel;
    }

    add_panels(panels, node_container, line_container) {
        var active_panel = null;

        // create objects for each panel by adding the nodes and lines 
        Object.values(panels).forEach(panel => {
            const nodes = panel.nodes.map(node_name => node_container.nodes[node_name]),
                  lines = panel.lines.map(line_name => line_container.lines[line_name]);

            this.panels[panel.name] = new RecursivePiecingGeometricPanel(nodes, lines, panel.name);

            // set the top panel
            if( panel.is_top_panel ) {
                this.top_panel = this.panels[panel.name];
            }

            // set the active panel
            if( panel.is_active_panel ) {
                active_panel = this.panels[panel.name];
            }
        });

        // now that the panels have been created, loop through again and add their children 
        Object.values(panels).forEach(panel => {
            this.panels[panel.name].left_panel = panel.left_panel===null? null : this.panels[panel.left_panel]
            this.panels[panel.name].right_panel = panel.right_panel===null? null : this.panels[panel.right_panel]
            this.panels[panel.name].split_line = panel.split_line===null? null : line_container.lines[panel.split_line]
        });

        return active_panel;
    }

    get_selected_panel(x, y) {
        return this._recursively_get_selected_panel(x, y, this.top_panel);
    }

    _recursively_get_selected_panel(x, y, current_panel) {
        if( !current_panel.has_children() ) {
            return current_panel;
        }
        
        const normal_vec = current_panel.split_line.normal_vector(), 
              midpoint = current_panel.split_line.midpoint();
        
        const diffx = x-midpoint.x, diffy = y-midpoint.y;
        const dot = diffx*normal_vec.x + diffy*normal_vec.y

        return dot<0.0? this._recursively_get_selected_panel(x, y, current_panel.left_panel)
        : this._recursively_get_selected_panel(x, y, current_panel.right_panel);
    }
}

export class RecursivePiecingGeometricPanel {
    constructor(nodes, lines, name) {
        this.nodes = nodes;
        this.lines = lines;
        this.name = name;
    }

    includes_node(node) {
        for( var key in this.nodes ) {
            if( this.nodes[key]===node ) {
                return true;
            }
        }
        return false;
    }

    includes_line(line_name) {
        for( var key in this.lines ) {
            if( this.lines[key].name===line_name ) {
                return true;
            }
        }
        return false;
    }

    split(left_panel, right_panel, split_line) {
        this.left_panel = left_panel;
        this.right_panel = right_panel;
        this.split_line = split_line;
    }

    has_children() {
        return this.left_panel!==undefined && this.left_panel!==null
            && this.right_panel!==undefined && this.right_panel!==null
            && this.split_line!==undefined && this.split_line!==null
    }
}

export function initialize_recursive_piecing_containers() {
    // initialize a container of nodes
    var node_container = new RecursivePiecingNodeContainer();
    const node0 = node_container.add_node(0, 0), node1 = node_container.add_node(1, 0), 
          node2 = node_container.add_node(1, 1), node3 = node_container.add_node(0, 1);
    
    // initialize a container of lines
    var line_container = new RecursivePiecingLineContainer();
    const line0 = line_container.add_line(node0, node1), line1 = line_container.add_line(node1, node2),
          line2 = line_container.add_line(node2, node3), line3 = line_container.add_line(node3, node0);
    
    // initialize a container of lines
    var panel_container = new RecursivePiecingPanelContainer();
    panel_container.add_panel([node0, node1, node2, node3], [line0, line1, line2, line3]);

    return [node_container, line_container, panel_container];
}