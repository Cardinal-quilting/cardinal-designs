from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.models.recursive_piecing.nodes import Node
from projects.models.recursive_piecing.lines import Line
from projects.serializers.recursive_piecing_serializer import LineSerializer
    
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
        for line in request.data.values():
            serializer = LineSerializer(data={
                "recursive_piecing_project": project.recursive_piecing.id,
                "start": Node.objects.get(name=line["start"] ["name"], recursive_piecing_project=project.recursive_piecing.id).id,
                "end": Node.objects.get(name=line["end"] ["name"], recursive_piecing_project=project.recursive_piecing.id).id,
                "leaf_line": line["leaf_line"],
                "name": line["name"]
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

        lines = { line.name: { "start": line.start.name, "end": line.end.name, "name": line.name } for line in lines }
        return Response({"lines": lines})