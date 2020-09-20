FROM node:12 as builder
WORKDIR /app

# Install dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

# Build
COPY ./tsconfig.json ./
COPY ./pages ./pages
COPY ./public ./public
## COPY ./scripts ./scripts
RUN npm run build


FROM node:12-alpine
WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

CMD ["npm", "run", "start"]