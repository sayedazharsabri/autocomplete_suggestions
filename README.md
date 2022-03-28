# autocomplete_suggestions
This project will help user to find the suggested city names on the basis of provided query parameter with API call.

# Get started with the project
Step 1: Clone this repository.
Step 2: run "yarn install" to install all the required packages.
Step 3: Add connection string and port details to yarn.json.
Step 4: run "yarn start:dev" to execute this project on localhost.
Note: After step 4, the project will create a cities collection in the provided mongodb database with required location index.
Step 5: Import data from [/doc/dummyCitiesCollection.json](https://github.com/sayedazharsabri/autocomplete_suggestions/blob/dev/doc/dummyCitiesCollection.json) to the cities collection.
Step 6: Send a GET request [localhost:3000/suggestions?q=dummy1&latitude=34.46999&longitude=-122.25257&radius=393116.845&sort=distance ](localhost:3000/suggestions?q=dummy1&latitude=34.46999&longitude=-122.25257&radius=393116.845&sort=distance).

# If you create collection manually
Note: Please create location index using "db.cities.createIndex( { location: "2dsphere" } )" command.
Note: Please fill the data in the format of [city model](https://github.com/sayedazharsabri/autocomplete_suggestions/blob/master/src/models/city.ts).

## Acceptance criteria
- User can fetch cities with latitude and longitude and distance if filter does matched.
- User should get blank suggestions if filter does not matched.
- User should get 422 - validation failed if not provided proper filter.

## What next?
- We will add filter for alternate name also.
