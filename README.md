# a5 Group assignment

## Best Practices

- Language used in commits: English.
- Be as clear as possible in commits and names.
- Two approvals on every pull request before merge. Whoever can perform a merge.
- Prettier extension in Vscode with single quotation.
- BEM-ish for class names in SASS/CSS.
- Work in separate branches; Don´t remove the branch after merge.
- Assign yourself when working on an card.
- Use kebab-case when for branch names

## Meeting notes

Included in the repo.

# Grayness API Documentation

## Overview

This API provides access to information about movie screenings, reviews, and movie ratings.

## Base URL

`http://localhost:5080/api`

## Endpoints

### 1. Get Latest Screenings

`GET /screenings`

#### Description

Retrieve all the latest movie screenings.

#### Example Response

`[
{
"id": 1,
"start_time": "2024-02-11T21:00:00.000Z",
"room": "Stora salongen",
"movie": "Isle of dogs"

},

{
"id": 5,
"start_time": "2024-02-12T19:00:00.000Z",
"room": "Stora salongen",
"movie": "The Muppets"
},
...
]`

### 2. Get Specific Movie Screenings

`GET /movies/:movieID/screenings`

#### Description

Retrieve screenings for a specific movie.

#### Parameters

- `movieID`: ID of the movie for which to retrieve screenings.

#### Example Response

`{

"data": [

{

"id": 243,

"attributes": {

"start_time": "2024-02-18T19:00:00.000Z",

"room": "Stora salongen",

"createdAt": "2024-01-29T19:08:55.713Z",

"updatedAt": "2024-01-29T19:08:55.713Z",

"movie": {

"data": {

"id": 2,
"attributes": {

"title": "Encanto",
"imdbId": "tt2953050",
"intro": "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
"image": {
"url": "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg"
},
"createdAt": "2023-01-23T06:46:23.765Z",
"updatedAt": "2024-01-24T10:52:48.366Z",
"publishedAt": "2023-01-23T06:46:29.324Z"
}
}
}
}
},
...
]`

### 3. Get Movie Reviews

`GET /movies/:movieId/reviews`

#### Description

Retrieve reviews for a specific movie.

#### Parameters

- `movieId`: ID of the movie for which to retrieve reviews.
- `page` (optional): Page number for paginated results (default is 1).

#### Example Response

jsonCopy code

`{
"reviews": {

"review": [
{
"id": 171,
"reviewer": null,
"rating": 4,
"comment": "Very nice movie"
},
...
]
"pagination": {
"page": 1,
"pageSize": 5,
"pageCount": 7,
"total": 31
}`

### 4. Get Movie Rating

`GET /movies/:movieID/rating`

#### Description

Retrieve the average rating for a specific movie.

#### Parameters

- `movieID`: ID of the movie for which to retrieve the rating.

#### Example Response

To be added by [**rl-86**](https://github.com/rl-86)

### 5. Add Movie Review

`POST /movies/:movieID/review`

#### Description

Add a review for a specific movie.

#### Parameters

- `movieID`: ID of the movie for which to add the review.

#### Example Request Body

To be added by [**MasakiShiraishi**](https://github.com/MasakiShiraishi) & [**Simon Pizevski**](https://github.com/simonpizevski)
