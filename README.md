# Phase 3 Project: Travelogue

## Introduction

The Travelogue web application is designed to provide users with insights into various cities by sharing experiences and activities. It operates as a single-page application, utilizing the React framework on the frontend. The backend is powered by Active Record Object-Relational Mapping, which ensures efficient data management and connectivity to the database. It takes advantage of RESTful conventions to enable smooth communication between the client and server.

You can find more details about the backend implementation [here](https://github.com/jjpark987/phase-3-sinatra-react-project).

## Description

Travelogue offers users the option to explore cities either by browsing a list of cities or by directly accessing a randomly chosen city. Once a city is selected, users gain access to a collection of posts specific to that city. The application provides various interactive features, allowing users to create or delete a city, as well as create, edit, and delete posts related to the chosen city.

### City List

The City List component is responsible for rendering all cities stored in the database. By default, the cities are sorted in descending order based on their population. Users can narrow their search by directly typing in the input field. They also have the option to sort the current list by the city name or the country it resides in.

At the top of the page is an "Add City" button that directs the users to a form where they can input the details of a new city.

### Post List

Once a city has been selected, the Post List component displays all posts for that city. By default, the posts are sorted by date, with the newest ones appearing first. Each post is presented with its title, category, and the date it was created. Users have the option to filter the posts based on its category: "general" for thoughts/experiences and "activities" for specific activities/events. 

Similar to City List, Post List has an "Add Post" button to create a new post. At the bottom of the page is the "Delete City" button to delete the current city.

### Post Detail

The Post Detail component contains the body of the post, along with its title, category, and date. From here, users can choose to edit or delete the post by pressing the corresponding buttons.

### Random City

If the user wants to browse the posts of a random city, they can click on the "Random City" tab at the top of the page. This programmatically navigates them directly to the Post List of that city.

## Support

Please contact me at jjpark987@gmail.com for any questions.
