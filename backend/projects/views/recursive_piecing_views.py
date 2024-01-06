from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing
from projects.models.recursive_piecing.nodes import Node
from projects.models.recursive_piecing.lines import Line
from projects.serializers.recursive_piecing_serializer import RecursivePiecingSerializer, NodeSerializer, LineSerializer

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
                    for field in RecursivePiecing._meta.get_fields() if field.name!="recursive_piecing_nodes"} 
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

        lines = [ {"start": line.start, "end": line.end, 
                   "name": line.name,
                   "project ID": line.recursive_piecing_project.project.id,
                   "recursive piecing project ID": line.recursive_piecing_project.id } for line in lines]

        return Response(lines)
    
class SaveRecursivePiecingLines(APIView):
    def post(self, request, project_id):
        project = Project.objects.get(id=project_id) 

        success = True
        for line_name, line in request.data.items():
            serializer = LineSerializer(data=line | 
                                             {"recursive_piecing_project": project.recursive_piecing.id, 
                                              "name": line_name})
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

        lines = { line.name: { "start": line.start, "end": line.end } for line in lines }
        return Response({"lines": lines})