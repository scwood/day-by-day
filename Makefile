name = day-by-day
hostPort = 3001
containerPort = 3001

stop:
	docker stop $(name) || true
remove: stop
	docker rm $(name) || true
run: remove
	docker run -d --name $(name) -p $(hostPort):$(containerPort) $(name)
enter:
	docker exec -it $(name) /bin/bash
buildImage:
	docker build -t $(name) .
logs:
	docker logs $(name)
