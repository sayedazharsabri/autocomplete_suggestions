# autocomplete_suggestions
This project will help user to find the suggested city names on the basis of provided query parameter with API call.

# Get started with the project
- Step 1: Clone this repository.
- Step 2: Run Command - "yarn install" to install all the required packages.
- Step 3: Add connection string and port details to yarn.json.
- Step 4: Run Command - "yarn start:dev" to execute this project on localhost.
- Note: After step 4, the project will create a cities collection in the provided mongodb database with required location index.
- Step 5: Import data from [/doc/dummyCitiesCollection.json](https://github.com/sayedazharsabri/autocomplete_suggestions/blob/dev/doc/dummyCitiesCollection.json) to the cities collection.
- Step 6: Send a GET request [localhost:3000/suggestions?q=dummy1&latitude=34.46999&longitude=-122.25257&radius=393116.845&sort=distance ](http://localhost:3000/suggestions?q=dummy1&latitude=34.46999&longitude=-122.25257&radius=393116.845&sort=distance).

# To run tests
- After project setup
- Run Command - "yarn test"


# To run using Docker
- Add "CONNECTION_STRING" in host environment
- Default environment variables are in .env at root, if you want to change anything like PORT then change here
- To create docker image
- Run Command - "docker-compose build"
- To run docker conatiner
- Run Command - "docker-compose up -d"
- To stop running docker conatiner
- Run Command - "docker-compose down"


# If you create collection manually
- Note: Please create location index using "db.cities.createIndex( { location: "2dsphere" } )" command.
- Note: Please fill the data in the format of [city model](https://github.com/sayedazharsabri/autocomplete_suggestions/blob/master/src/models/city.ts).

## Acceptance criteria
- User can fetch cities with latitude and longitude and distance if filter does matched.
- User should get blank suggestions if filter does not matched.
- User should get 422 - validation failed if not provided proper filter.


## What next?
- We will add featue to show alt_name and ascii name if they match and name does not match, in place of name.
- We will analyse and add feature to block IP address for some duration, if they are attempting too many times again and again.

## configuration
- CONSIDER_ASCII_AND_ALT_NAME_MATCHING_BUT_SHOW_NAME_ONLY : By default its true. If it is true, then for query matching it also check for ascii and alt_name otherwise it only match name from collection.
- ENABLE_IP_RATE_LIMITING: By default this flag is false, if you want to apply rate limiting over ip address then run "redis" cache on some server or localhost or using docker and then update "REDIS_HOST" IP in .env and nodemon.json file, and  make flag true. 

## Notes
- Radius is in KM.
- To configure rate limiting kindly check constants file. By default it allow maximum 5 attempts in 1 minute from same IP address.
- To run redis using docker use the command "docker run --name suggestions-redis -p 6379:6379 -d redis"
