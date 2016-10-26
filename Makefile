name = day-by-day
hostPort = 3001
containerPort = 3001
tag = scwood/$(name):latest

stop:
	docker stop $(name) || true
remove: stop
	docker rm $(name) || true
removeImage: remove
	docker rmi $(tag) || true
run: remove
	docker run -d --name $(name) -p $(hostPort):$(containerPort) $(tag)
build:
	docker build -t $(tag) .
enter:
	docker exec -it $(name) /bin/bash
logs:
	docker logs $(name)
push:
	docker push ${tag}
deploy: removeImage build push
