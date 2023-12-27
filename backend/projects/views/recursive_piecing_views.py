from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing
from projects.models.recursive_piecing.nodes import Node
from projects.serializers.recursive_piecing_serializer import RecursivePiecingSerializer, NodeSerializer

class LoadRecursivePiecing(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        serializer = RecursivePiecingSerializer(project.recursive_piecing)
        return Response(serializer.data)

class GetAllRecursivePiecingSettings(APIView):
    def get(self, request):
        detail = [ { "project ID": rp.project.id,
                     "recursive piecing ID": rp.id,
                     "node_size": rp.node_size,
                     "min_node_size": rp.min_node_size,
                     "max_node_size": rp.max_node_size,
                     "node_color": rp.node_color } for rp in RecursivePiecing.objects.all() ]

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