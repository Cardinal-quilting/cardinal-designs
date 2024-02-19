from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.models.recursive_piecing.nodes import Node
from projects.models.recursive_piecing.lines import Line
from projects.models.recursive_piecing.panels import Panel
from projects.serializers.recursive_piecing_serializer import PanelSerializer

class GetAllRecursivePiecingPanels(APIView):
    def get(self, request, project_id = None):
        if project_id is None:
            panels = Panel.objects.all()
        else:
            try:
                project = Project.objects.get(id=project_id) 
                panels = Panel.objects.filter(recursive_piecing_project=project.recursive_piecing.id)
            except:
                return Response()

        panels = [ {"name": panel.name,
                    "node_names": str([n.name for n in panel.nodes.all()]).replace("\'", "").replace("[", "").replace("]", ""),
                    "line_names": str([l.name for l in panel.lines.all()]).replace("\'", "").replace("[", "").replace("]", ""),
                    "project ID": panel.recursive_piecing_project.project.id,
                    "left_panel": None if panel.left_panel is None else panel.left_panel.name,
                    "right_panel": None if panel.right_panel is None else panel.right_panel.name,
                    "split_line": None if panel.split_line is None else panel.split_line.name,
                    "recursive piecing project ID": panel.recursive_piecing_project.id } for panel in panels]

        return Response(panels)

class SaveRecursivePiecingPanels(APIView):
    def post(self, request, project_id):
        project = Project.objects.get(id=project_id) 

        # get the name of the top panel 
        top_panel_name = request.data.pop("top_panel_name")

        # if there is an active panel, pull it off the incoming data
        active_panel_name = request.data.pop("active_panel_name", None)

        panels = request.data["panels"]

        def save_panel(panel):
            # get the panel name 
            panel_name = panel.pop("name")

            # get the nodes and lines that make up this panel
            node_ids = [Node.objects.get(name=n, recursive_piecing_project=project.recursive_piecing.id).id for n in panel.pop("nodes")]
            line_ids = [Line.objects.get(name=l, recursive_piecing_project=project.recursive_piecing.id).id for l in panel.pop("lines")]

            # store the data for this panel
            data = {
                "recursive_piecing_project": project.recursive_piecing.id, 
                "name": panel_name,
                "nodes": node_ids, 
                "lines": line_ids
                }

            # determine if this is the top panel
            if panel_name==top_panel_name:
                data["is_top_panel"] = project.recursive_piecing.id

            # determine if this is the active panel
            if active_panel_name is not None and panel_name==active_panel_name:
                data["is_active_panel"] = project.recursive_piecing.id

            def store_child_panel(child_panel_name, left_or_right_panel):
                # if we have not written the child yet, write it to the database
                if child_panel_name in panels:
                    child_save_success = save_panel(panels.pop(child_panel_name))
                    if not child_save_success:
                        return False

                data[left_or_right_panel] = Panel.objects.get(name=child_panel_name, recursive_piecing_project=project.recursive_piecing.id).id
                return True            

            # if this panel has children, store the left panel
            left_panel_name = panel.pop("left_panel", None)
            if left_panel_name is not None:
                left_save_success = store_child_panel(left_panel_name, "left_panel")
                if not left_save_success:
                    return False

            # if this panel has children, store the right panel
            right_panel_name = panel.pop("right_panel", None)
            if right_panel_name is not None:
                right_save_success = store_child_panel(right_panel_name, "right_panel")
                if not right_save_success:
                    return False

            # get the line that splits the plane
            split_line_name = panel.pop("split_line", None)
            if split_line_name is not None:
                data["split_line"] = Line.objects.get(name=split_line_name, recursive_piecing_project=project.recursive_piecing.id).id

            # save the panel to the database
            serializer = PanelSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return True
            return False

        # store each panel (recursively so that we save children before their parents)
        while len(panels)>0:
            success = save_panel(panels.pop(list(panels.keys()) [0]))

        return Response({ "success": True, "project_id": project_id }) if success \
            else Response({ "success": False, "project_id": project_id, "message": "FAILED: Unable to save recursive piecing panels."})
        
class LoadRecursivePiecingPanels(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        panels = Panel.objects.filter(recursive_piecing_project=project.recursive_piecing.id)

        panels = { panel.name: { 
            "is_top_panel": panel.is_top_panel is not None,
            "is_active_panel": panel.is_active_panel is not None,
            "nodes": [n.name for n in panel.nodes.all()], 
            "lines": [l.name for l in panel.lines.all()],
            "left_panel": None if panel.left_panel is None else panel.left_panel.name,
            "right_panel": None if panel.right_panel is None else panel.right_panel.name,
            "split_line": None if panel.split_line is None else panel.split_line.name,
            "name": panel.name } for panel in panels}
        return Response({"panels": panels})