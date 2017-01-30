## Movie Keeper

Application that allows users to keep track of their movie collection and the format in which they own each individual movie.

The project was built with [React](https://facebook.github.io/react/), CSS/SCSS, [React Bootstrap](https://react-bootstrap.github.io/), [React YouTube](https://github.com/troybetz/react-youtube), [React Router 4](https://react-router.now.sh/), [webpack](https://webpack.github.io/), and [Firebase](http://firebase.google.com/).

Movie information was acquired using [The Movie Database API](https://www.themoviedb.org/).

## Project Status

The project is currently under test.

Styling is under continuous update.

Not pushed to production.

## Project Screen Shot(s)

![My Movies](lib/screenshots/my_movies.png?raw=true "My Movies")

![My Movie Details](lib/screenshots/my_movie_modal.png?raw=true "Movie Details")

![My Movie Trailer](lib/screenshots/my_movie-youtube.png?raw=true "My Movie Trailer")

![Recent and Upcoming](lib/screenshots/recent_upcoming.png?raw=true "Recent and Upcoming")

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`   

To Start Server:

`npm start`  

## Reflection

This is a personal project that was built during Module 3 at Turing School of Software and Design.

I wanted to build an application that challenged my knowledge of React, APIs, and basic javascript. While I expected the most difficult part of this project would be the React side, it was not. The most challenging portion of this project was selecting the necessary 'key' 'value' pairs that contained the data I wanted to display to the page.

Additionally, not all the information on a single page was retrieved in a one API request. This presented the challenge of sending multiple requests, while balancing proper passage of props to keep performance high.
