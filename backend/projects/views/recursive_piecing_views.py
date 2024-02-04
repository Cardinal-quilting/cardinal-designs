from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing
from projects.models.recursive_piecing.nodes import Node
from projects.models.recursive_piecing.lines import Line
from projects.models.recursive_piecing.panels import TopPanel
from projects.serializers.recursive_piecing_serializer import RecursivePiecingSerializer, NodeSerializer, LineSerializer, TopPanelSerializer

class LoadRecursivePiecing(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        serializer = RecursivePiecingSerializer(project.recursive_piecing)
        return Response(serializer.data)

class GetAllRecursivePiecingSettings(APIView):
    def get(self, request):
        def get_field(rp, name):
            if name=="project":
                return rp.project.id
            return getattr(rp, name)

        # the field name "recursive_piecing_nodes" comes from the nodes that are associated with this project
        detail = [ { field.name: get_field(rp, field.name) 
                    for field in RecursivePiecing._meta.get_fields() 
                    if (field.name!="recursive_piecing_nodes") & (field.name!="recursive_piecing_lines")
                    } 
                    for rp in RecursivePiecing.objects.all() ]

        return Response(detail)

class SaveRecursivePiecingSettings(APIView):
    def post(self, request, project_id):
        # get the project that will be associated with this recursive piecing
        request.data["project"] = project_id

        serializer = RecursivePiecingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({ "success": True, "project_id": project_id })
        return Response({ "success": False, "project_id": project_id, "message": "FAILED: Unable to save recursive piecing settings." })
    
class GetAllRecursivePiecingNodes(APIView):
    def get(self, request, project_id = None):
        if project_id is None:
            nodes = Node.objects.all()
        else:
            try:
                project = Project.objects.get(id=project_id) 
                nodes = Node.objects.filter(recursive_piecing_project=project.recursive_piecing.id)
            except:
                return Response()

        nodes = [ {"x": node.x, "y": node.y, 
                   "name": node.name,
                   "project ID": node.recursive_piecing_project.project.id,
                   "recursive piecing project ID": node.recursive_piecing_project.id } for node in nodes]

        return Response(nodes)
    
class SaveRecursivePiecingNodes(APIView):
    def post(self, request, project_id):
        project = Project.objects.get(id=project_id) 

        success = True
        for node_name, node in request.data.items():
            serializer = NodeSerializer(data=node | 
                                             {"recursive_piecing_project": project.recursive_piecing.id, 
                                              "name": node_name})
            if serializer.is_valid():
                serializer.save()
            else:
                success = False
        
        return Response({ "success": True, "project_id": project_id }) if success \
            else Response({ "success": False, "project_id": project_id, "message": "FAILED: Unable to save recursive piecing nodes."})
    
class LoadRecursivePiecingNodes(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        nodes = Node.objects.filter(recursive_piecing_project=project.recursive_piecing.id)

        nodes = { node.name: { "x": node.x, "y": node.y } for node in nodes }
        return Response({"nodes": nodes})
    
class GetAllRecursivePiecingLines(APIView):
    def get(self, request, project_id = None):
        if project_id is None:
            lines = Line.objects.all()
        else:
            try:
                project = Project.objects.get(id=project_id) 
                lines = Line.objects.filter(recursive_piecing_project=project.recursive_piecing.id)
            except:
                return Response()

        lines = [ {"start node name": line.start.name, 
                   "end node name": line.end.name, 
                   "name": line.name,
                   "project ID": line.recursive_piecing_project.project.id,
                   "recursive piecing project ID": line.recursive_piecing_project.id } for line in lines]

        return Response(lines)
    
class SaveRecursivePiecingLines(APIView):
    def post(self, request, project_id):
        project = Project.objects.get(id=project_id) 

        success = True
        for line_name, line in request.data.items():
            serializer = LineSerializer(data={
                "recursive_piecing_project": project.recursive_piecing.id,
                "name": line_name, 
                "start": Node.objects.get(name=line["start"], recursive_piecing_project=project.recursive_piecing.id).id,
                "end": Node.objects.get(name=line["end"], recursive_piecing_project=project.recursive_piecing.id).id
                })
            if serializer.is_valid():
                serializer.save()
            else:
                success = False
        
        return Response({ "success": True, "project_id": project_id }) if success \
            else Response({ "success": False, "project_id": project_id, "message": "FAILED: Unable to save recursive piecing lines."})
        
class LoadRecursivePiecingLines(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        lines = Line.objects.filter(recursive_piecing_project=project.recursive_piecing.id)

        lines = { line.name: { "start": line.start.name, "end": line.end.name } for line in lines }
        return Response({"lines": lines})

class GetAllRecursivePiecingPanels(APIView):
    def get(self, request, project_id = None):
        if project_id is None:
            panels = TopPanel.objects.all()
        else:
            try:
                project = Project.objects.get(id=project_id) 
                panels = TopPanel.objects.filter(recursive_piecing_project=project.recursive_piecing.id)
            except:
                return Response()

        panels = [ {"name": panel.name,
                   "project ID": panel.recursive_piecing_project.project.id,
                   "recursive piecing project ID": panel.recursive_piecing_project.id } for panel in panels]

        return Response(panels)

class SaveRecursivePiecingPanels(APIView):
    def post(self, request, project_id):
        project = Project.objects.get(id=project_id) 

        success = True
        for panel_name, panel in request.data.items():
            node_ids = [Node.objects.get(name=n, recursive_piecing_project=project.recursive_piecing.id).id for n in panel.pop("nodes")]
            line_ids = [Line.objects.get(name=l, recursive_piecing_project=project.recursive_piecing.id).id for l in panel.pop("lines")]
            serializer = TopPanelSerializer(data={
                "recursive_piecing_project": project.recursive_piecing.id, 
                "name": panel_name,
                "nodes": node_ids, 
                "lines": line_ids})

            if serializer.is_valid():
                serializer.save()
            else:
                success = False

        return Response({ "success": True, "project_id": project_id }) if success \
            else Response({ "success": False, "project_id": project_id, "message": "FAILED: Unable to save recursive piecing panels."})
        

class LoadRecursivePiecingPanels(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        panels = TopPanel.objects.filter(recursive_piecing_project=project.recursive_piecing.id)

        panels = { panel.name: { 
            "nodes": [n.name for n in panel.nodes.all()], 
            "lines": [l.name for l in panel.lines.all()] } for panel in panels}
        return Response({"panels": panels})