FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

EXPOSE 5000
# Bundle app source
COPY . .

CMD [ "npm", "run", "dev" ]
