Hello and welcome to the server side of the MaintControl project :)
This file will include everything you need to know in order to develop the server.

This folder includes:
1. Server architcures
2. Installations insturctions
3. Postman Requests

------------------------ Installations ----------------------
1. run in the command line the commands:'npm init' and then 'npm install' in order to install 
all the pacakges of npm we used in the project.

2. In order to upload the image to GCP:
docker build -t maint_control_docker_image .
docker tag maint_control_docker_image gcr.io/maintcontrol/maint_control_docker_image
docker push gcr.io/maintcontrol/maint_control_docker_image

url: https://maint-control-docker-image-2n3aq2y4ja-zf.a.run.app