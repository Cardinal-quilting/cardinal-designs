from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing
from projects.serializers.recursive_piecing_serializer import RecursivePiecingSerializer

class LoadRecursivePiecing(APIView):
    def get(self, request, project_id):
        project = Project.objects.get(id=project_id) 
        serializer = RecursivePiecingSerializer(project.recursive_piecing)
        return Response(serializer.data)

class GetAllRecursivePiecingComponents(APIView):
    def get(self, request):
        detail = [ { "project_id": rp.project.id,
                     "node_size": rp.node_size,
                     "min_node_size": rp.min_node_size,
                     "max_node_size": rp.max_node_size,
                     "node_color": rp.node_color } for rp in RecursivePiecing.objects.all() ]

        return Response(detail)

class SaveRecursivePiecingView(APIView):
    def post(self, request, project_id):
        # get the project that will be associated with this recursive piecing
        request.data["project"] = project_id

        serializer = RecursivePiecingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({ "success": True, "project_id": project_id })
        return Response({ "success": False, "project_id": project_id, "message": "FAILED: Unable to save recursive piecing component." })