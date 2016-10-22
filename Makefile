name = day-by-day
hostPort = 3001
containerPort = 3001
tag = scwood/$(name)

stop:
	docker stop $(name) || true
remove: stop
	docker rm $(name) || true
removeImage: remove
	docker rmi $(name) || true
run: remove
	docker run -d --name $(name) -p $(hostPort):$(containerPort) $(tag):latest
enter:
	docker exec -it $(name) /bin/bash
build:
	docker build -t $(name) .
logs:
	docker logs $(name)
push:
	docker push ${tag}
deploy: build push
