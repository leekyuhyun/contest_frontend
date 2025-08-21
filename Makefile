docker-build:
	@docker build -t owndevty/koren-frontend:0.0.2 .

docker-release:
	@docker build --platform linux/amd64 \
	--build-arg VITE_API_URL=http://116.89.186.151:32761 -t owndevty/koren-frontend:release-0.0.1 .
	@docker tag owndevty/koren-frontend:release-0.0.1 owndevty/koren-frontend:release-0.0.1
	@docker push owndevty/koren-frontend:release-0.0.1