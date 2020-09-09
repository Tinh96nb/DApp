FROM node:10.15.3-alpine

LABEL author="phamtinh"

# working dir ./app
WORKDIR /app

# Install the prerequisites to install the web3 and other ethereum npm packages
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev

# Copy the package.json
COPY ./package.json ./

# Install the dependencies
RUN npm install pm2 -g
RUN npm install yarn -g
RUN yarn install

# Copy the server and ethereum module
COPY . .

# set the default command
CMD ["yarn","start"]