#!/bin/bash -u

# Copyright 2018 ConsenSys AG.
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

chmod +x config/tessera/docker-entrypoint.sh

NO_LOCK_REQUIRED=true

. ./.env
. ./.common.sh

# create log folders with the user permissions so it won't conflict with container permissions
mkdir -p logs/besu logs/quorum logs/tessera

# Build and run containers and network
echo "docker-compose.yml" > ${LOCK_FILE}

echo "${bold}*************************************"
echo "Quorum Dev Quickstart"
echo "*************************************${normal}"
echo "Start network"
echo "--------------------"

echo "Starting network..."

if [ "$#" != "1" ]; then
    echo "You must provide one of the following arguments: validator, member, explorer. Example: ./run.sh member"
	exit 1;
fi

if [ $1 == "member" ]
then
  echo "Starting member node..."
  docker compose --profile member build --pull
  docker compose --profile member up --detach
elif [ $1 == "validator" ]
then
  echo "Starting validator node..."
  docker compose --profile validator build --pull
  docker compose --profile validator up --detach
elif [ $1 == "explorer" ]
then
  echo "Starting explorer node..."
  docker compose --profile explorer build --pull
  docker compose --profile explorer up --detach
else
  echo "Please specify if you want to start a member or a validator... Example: ./run.sh member"
  exit 1
fi


#list services and endpoints
./list.sh
