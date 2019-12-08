# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ARG HOST_ARG=localhost
ARG PORT_ARG=3000
ENV STACKL_API_HOST=212.47.241.119
ENV STACKL_API_PORT=$PORT_ARG

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]