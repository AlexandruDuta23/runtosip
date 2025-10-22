FROM node:22

WORKDIR /usr/src/app

COPY . .

EXPOSE 4173

RUN npm install
# RUN npm run build
# RUN npm install -g serve

CMD ["npm", "run", "preview", "--host"]