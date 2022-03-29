# syntax=docker/dockerfile:1

FROM node:14.18.0 as base

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./yarn.lock


RUN yarn install
COPY . ./
RUN yarn build