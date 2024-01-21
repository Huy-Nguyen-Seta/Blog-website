FROM node:18-alpine as dependencies
WORKDIR /project
COPY package.json ./
RUN yarn install --network-timeout 1000000000

FROM node:18-alpine as builder
WORKDIR /project
COPY . .
COPY --from=dependencies /project/node_modules ./node_modules
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /project
COPY .env /project
ENV NODE_ENV=development
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /project/next.config.js ./
COPY --from=builder /project/public ./public
COPY --from=builder /project/.next ./.next
COPY --from=builder /project/node_modules ./node_modules
COPY --from=builder /project/package.json ./package.json


EXPOSE 1339
CMD ["yarn", "start"]
