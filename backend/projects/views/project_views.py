from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 

from projects.models.project_model import Project
from projects.serializers.project_serializer import ProjectSerializer

class ProjectNamesView(APIView):
    def get(self, request):
        detail = [ { 
            "project_id": detail.id, 
            "project_name": detail.project_name
            } for detail in Project.objects.all() ] 
        
        return Response(detail) 

class DeleteProjectView(APIView):
    def delete(self, request, project_id):
        existing_project = Project.objects.get(id=project_id)
        existing_project.delete()
        return Response() 
    
class LoadProjectView(APIView): 
    def get(self, request, project_id): 
        project = Project.objects.get(id=project_id) 
        serializer = ProjectSerializer(project)
        return Response({ "project_id": project_id } | serializer.data)
  
class SaveProjectView(APIView): 
    def post(self, request): 
        # check to see if we have a project with this name
        existing_project = Project.objects.filter(project_name=request.data.get("project_name"))
        assert(len(existing_project) in {0, 1})

        input_id = None if request.data.get("project_id") is None else int(request.data.get("project_id"))

        # a project with this name already exists and it is not the one we are saving, return an error
        if len(existing_project)>0 and existing_project[0].id!=input_id:
            return Response({ "success": False, "message": f"""Project "{existing_project[0].project_name}" already exists.""" }) 

        # save the project to the database
        serializer = ProjectSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save()
            # return the project id
            return Response({ "success": True, "project_id": serializer.data["id"] }) 