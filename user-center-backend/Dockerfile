FROM openjdk:17-jdk-alpine
WORKDIR /app

#将这个文件和jar包放在同一目录下，创建镜像
#docker build -t user-center-backend:v0.0.1 .
#docker run -p 8080:8080 user-center-backend:v0.0.1
COPY ./user-center-0.0.1-SNAPSHOT.jar /app
CMD ["java", "-jar", "user-center-0.0.1-SNAPSHOT.jar","--spring.profiles.active=prod"]
