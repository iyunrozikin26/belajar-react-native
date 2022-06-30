# Base image
FROM node:16.15.1-alpine3.16
# Path in container which will be used for our app
WORKDIR /usr/local/app/
# Environment variables
ENV PORT=8080
ENV JWT_SECRET_KEY=inirahasiailahi
# Copy the dependencies to WORKDIR
COPY ./package.json ./package-lock.json ./
# Install the dependencies
RUN npm i && npm cache clean --force
RUN npm i -g nodemon
# Copy all the files to WORKDIR
COPY ./ ./
# Execute the app
CMD ["npm", "run", "start"]