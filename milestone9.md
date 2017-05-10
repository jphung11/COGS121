<h1>Team Progress</h1>
<hr>
<h5>Aaron Hurtado:</h5>
<p> For this milestone, I worked on modifying the business submission page. I added that so when a business submits a dish and it is successful they get directed to the main index page of our site. I have also been learning how to use Firebase for the goal of having it such that when a busniess submits a dish on our web app, the dish will show up on our list of dishes to show the user.
</p>
<h5>Jennifer Phung:</h5>

<p>For this milestone, I worked on trying to get the foodfinder to get the food data from the dishes database that is actually submitted. However, I ran into some problems trying to figure out how to go through the unique ids given to each dish upon submission. As a result, the code I implemented is specifically coded to index the unique id at the moment to see if it works accordingly. Through testing around with that, I found that to index each dish I would need the unique id string and that it will show properly with it. However, I still have the problem of how I can get the dish's info into my code without knowing the unique id.</p>

<h5>Tae Hee Ki:</h5>

<p>For this milestone, I worked on trying to get the carousel list to work based on the database of our firebase. I ran into a few problems such as now knowing how to read from the database and constantly append to the carousel list. My next problem after that was trying to append the caption to the image from the database. However, that was easily solved by using concat.</p>

<h5>Trung Do:</h5>

<p>For this milestone, I worked on displaying all contents that business owner submitted in the app. I was struggling with dealing how to store the location to the database (from the business form) at first (call-back functions). However, I were finally able to store it in the database and then query in the map page. Each location also has food images.
I will try to make a query that shows all near by good food in the next milestone. We then can use it to display all foods in near by distance to Tinder-like page.</p>
<hr>
<h1>Screenshots</h1>
<img src="https://cloud.githubusercontent.com/assets/16699899/25921348/ea0e0fc8-3589-11e7-8ed8-cf1fdd361f06.png" width="90%"></img> 
<p>The screenshot above shows that the user's submission from the form is not added as a pin to the map. The map is not getting pins from a simple query anymore.</p>
<br>
<img src="https://cloud.githubusercontent.com/assets/16699899/25916820/ddf57794-357a-11e7-81cc-02a3e8c91f2e.png" width="90%"></img> <img src="https://cloud.githubusercontent.com/assets/16699899/25916885/168731ba-357b-11e7-9745-af47ff81f45a.png" width="90%"></img> 
<p>The pictures above shows the food finder grabbing the first picture from the data that is submitted through the form we have.</p>
