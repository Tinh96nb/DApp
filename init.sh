#!/bin/bash

### Create network private ###
docker network create --subnet 172.10.0.1/16 private_net

### Build docker-compose ###
docker-compose up --build
