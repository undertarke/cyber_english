FROM node:16

# vi tri thu muc 
WORKDIR /app

COPY package.json .


# cau lenh run
RUN yarn

# coppy source
COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]