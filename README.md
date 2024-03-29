# EventTrackerProject (In Development)

## Description

This is the REST API implementation for a game tracking application. The program tracks information about video games that the user has played, including (but not limited to) the games' names, genres, ESRB ratings and user given scores.

Now includes a basic front-end application that allows you to view a list of games in a table. You can also search for games by a few different fields (genre, keyword, score, rating). There is also a field for adding a new game to the database. 

In addition to the Javascript/HTML front-end, there is now a new front-end web app built out using angular.

Currently updating is bugged and is in development.

## Technologies Used

- Java Spring Boot
- Spring REST
- Bootstrap
- Java Persistence API (JPA)
- JavaScript
- Angular
- HTML


## REST URIs
|HTTP Verb | URI | Request Body | Response Body | Purpose | Status Codes |
|----------|-----|------------ | -------------- | ------- | ------------
|GET |/api/games|           | Retrieves a collection of all games| collection endpoint| 200 |
|GET |/api/games/1|       | game 1| retrieve endpoint | 200, 404 |
|POST |/api/games |representation of new game resource |description of the result of the operation | create endpoint | 201, 400 |
|PUT |/api/games/1 |representation of new version of game 1 | | update endpoint | 200, 404, 400 |
|DELETE |/api/games/1 | | | | delete routes| 204, 404, 400 |
|GET |/api/games/search/genres/MMORPG| |collection of all games with genre of MMORPG | collection endpoint| 200 |
|GET |/api/games/search/rating/T | | |collection of all games with ESRB rating of T collection endpoint | 200 |
|GET |/api/games/search/scores/2/4 | |collection of all games with user score between 2 and 4 | collection endpoint | 200 |
|GET |/api/games/search/o | |collection of all games that have the letter 'o' in their name | collection endpoint| 200 |


## How To Access

Not Yet Implemented

## Lessons Learned

In this project I've learned how to implement a basic REST API using Spring repositories, service layer and REST controllers I've also learned how to use POSTMAN to test the application using REST URI's. I also learned about JSON and how it can be used in Request and Response bodies.

It appears that once you submit a form, the form is *consumed* somehow and is not available to be re-used. Current implementation allows the user to update once, but then if the user tries to update a second time, the form element is gone and can't be accessed. This means that I will need to dynamically create a new form everytime the user wants to update a game. ***FIXED*** Form is not created dynamically upon an update request so as to avoid the issue of the form being "consumed".

An issue I ran into using the angular front-end was using a date input type to collect a date user input. Angular reads in the inputs from the form as a string, but on the backend these are stored as datetimes in the database. I had some issues creating new games and updating existing games because of this. The solution I came up with was to store the incoming strings as date objects and store those date objects as fields in the game object. This allowed me to create and update the games correctly with the correct datetimes, but it still has issues. The edit form on the front end does not properly display the current release date or completion date for a game if they exist. I expect under the current implementation, I would need to somehow convert the date back into a string, but I'm not sure how to do that effectively. The best solution would have been to store these fields in the database as dates instead of datetimes since I don't use the specific times for anything in this webapp.

