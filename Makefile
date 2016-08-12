name = day-by-day-api
portOptions = 3002:80
hostPort = 3002
containerPort = 80

stop:
	docker stop $(name) || true
remove: stop
	docker rm $(name) || true
removeImage: remove
	docker rmi $(name) || true
run: remove
	docker run -d --name $(name) -p $(hostPort):$(containerPort) $(name)
enter:
	docker exec -it $(name) /bin/bash
build: removeImage
	docker build -t $(name) .
logs:
	docker logs $(name)
