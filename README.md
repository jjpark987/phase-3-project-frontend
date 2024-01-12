# Phase 3 Project: Travelogue

## Introduction

The Travelogue web application is designed to provide users with insights into various cities by sharing experiences and activities. It operates as a single-page application, utilizing the React framework on the frontend. The backend is powered by Active Record Object-Relational Mapping, which ensures efficient data management and connectivity to the database. It takes advantage of RESTful conventions to enable smooth communication between the client and server.

You can find more details about the backend implementation [here](https://github.com/jjpark987/phase-3-sinatra-react-project).

## Description

Travelogue offers users the option to explore cities either by browsing a list of cities or by directly accessing a randomly chosen city. They can read, write, and delete posts for that city. Users can also create or delete cities.

### City List

The City List component is responsible for rendering all cities stored in the database. By default, the cities are sorted by population in descending order. Users can fine tune their search by typing in the input field. They also have the option to sort the current list by the city name or the country it resides in.

At the top of the page is an "Add City" button that directs the users to a form where they can input the details of a new city.

### Post List

Once a city is selected, the Post List component displays all posts for that city. By default, the posts are sorted by date in reverse chronological order. Each post displays its title, category, and the date it was created. Users have the option to filter the posts based on its category: "general" for thoughts/experiences and "activities" for specific activities/events. 

Similar to City List, Post List has an "Add Post" button to create a new post. At the bottom of the page is the "Delete City" button to delete the current city.

### Post Detail

The Post Detail component renders the title, category, date, and body of the post. Users can choose to edit or delete the post by pressing the corresponding buttons.

### Random City

The "Random City" tab programmatically navigates them directly to the Post List of a random city.

## Demo

[Video Walkthrough](https://youtu.be/YYjzs0jWxEg)

## Support

Please contact me at jjpark987@gmail.com for any questions.
