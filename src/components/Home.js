import React from "react";

function Home() {
    return (
        <div id='home' className='component'>
            <h1>TRAVELOGUE</h1>
            <h2>A place to learn about experiences and activities in different cities</h2>
            <img 
                src='/cover-image.jpg' 
                alt='cover' 
                width='60%' 
            />
            <h2>To find a city, click on City List</h2>
            <h2>To go to a random city, click on Random City</h2>
        </div>
    )
}

export default Home;
