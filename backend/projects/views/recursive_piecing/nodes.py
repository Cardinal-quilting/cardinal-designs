from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.models.recursive_piecing.nodes import Node
from projects.serializers.recursive_piecing_serializer import NodeSerializer
    
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
                                             {"recursive_piecing_project": project.recursive_piecing.id})
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

        nodes = { node.name: { "x": node.x, "y": node.y, "name": node.name } for node in nodes }
        return Response({"nodes": nodes})
    