FROM openjdk:8-jdk AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:8-jdk
ARG JAR_FILE=build/libs/.jar
COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]