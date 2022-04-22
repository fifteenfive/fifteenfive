# builder stage
FROM node:alpine as builder

WORKDIR '/usr/src/app'


COPY package.json .
COPY package-lock.json ./

COPY nginx.conf .

RUN npm install

# node_module 을 제외하고 가져온다
COPY ./ ./

RUN npm run build

# run stage
FROM nginx
EXPOSE 80
EXPOSE 443
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html