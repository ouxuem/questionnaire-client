# 构建阶段
FROM node:18.20-alpine3.19 as build-stage

WORKDIR /app

COPY package.json ./

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# 运行阶段
FROM node:18.20-alpine3.19 as production-stage

WORKDIR /app

COPY --from=build-stage /app/package.json /app/package.json

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/next.config.mjs ./

EXPOSE 3000

CMD ["npm", "start"]
