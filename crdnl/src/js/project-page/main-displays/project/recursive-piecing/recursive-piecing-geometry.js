export class RecursivePiecingNodeContainer {
    constructor() {
        this.nodes = {};
    }

    add_node(x, y) {
        const node = new RecursivePiecingGeometricNode(x, y);
        this.nodes[node.name] = node;

        return node;
    }
}

class RecursivePiecingGeometricNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.name = `node${RecursivePiecingGeometricNode.instance_count++}`;
    }

    static instance_count = 0;
}

export class RecursivePiecingLineContainer {
    constructor() {
         this.lines = {};      
    }

    add_line(start, end) {
        const line = new RecursivePiecingGeometricLine(start, end);
        this.lines[line.name] = line;

        return line;
    }
}

class RecursivePiecingGeometricLine {
    constructor(start, end, leaf_line=true) {
        this.start = start;
        this.end = end;

        // is this a line associated with a leaf node
        this.leaf_line = leaf_line;

        this.name = `line${RecursivePiecingGeometricLine.instance_count++}`;

        // these are the lines that are contained within this line
        this.sub_lines = []
    }

    static instance_count = 0;

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
    constructor() {
        this.panels = {}
    }

    add_panel(nodes, lines) {
        const panel = new RecursivePiecingGeometricPanel(nodes, lines);
    
        if( Object.keys(this.panels).length===0 ) {
            this.top_panel = panel;
        }

        this.panels[panel.name] = panel;

        return panel;
    }

    get_selected_panel(x, y) {
        return this._recursively_get_selected_panel(x, y, this.top_panel);
    }

    _recursively_get_selected_panel(x, y, current_panel) {
        if( current_panel.split_line===undefined ) {
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

class RecursivePiecingGeometricPanel {
    constructor(nodes, lines) {
        this.nodes = nodes;
        this.lines = lines;

        this.name = `panel${RecursivePiecingGeometricPanel.instance_count++}`;
    }

    static instance_count = 0;

    includes_node(node_name) {
        for( var key in this.nodes ) {
            if( this.nodes[key].name===node_name ) {
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