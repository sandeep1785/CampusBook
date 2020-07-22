# CampusBook


## Description



## Functionalities
- Everyone can view the campus and reviews without signing up or logging in.
- The user will have to login to edit the campus details or any comments.
- The user can only edit/delete the campus and comments that they have added.

## Technologies Used:

- **HTML5**  - markup language for creating web pages and web applications  
- **CSS3**   - used for describing the presentation of a document written in a markup language  
- **Bootstrap** - free and open-source front-end web framework for designing websites and web applications quickly  
- **jQuery** - cross-platform JavaScript library designed to simplify the client-side scripting of HTML  
- **DOM Manipulation** - is a platform and language-neutral interface that allows programs and scripts to dynamically access and update the content, structure, and style of a document  
- **Node.js** - pen-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side  
- **Express.js** - for building web applications and APIs and connecting middleware  
- **REST** - REST (REpresentational State Transfer) is an architectural style for developing web services  
- **MongoDB** - open-source cross-platform document-oriented NoSQL database program to store details like users info, campgrounds info and comments  
- **PassportJS** - authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application  
- **Data Associations** - associating user data with the respective campgrounds and comments using reference method  
- **Heroku** - cloud platform as a service used as a web application deployment model  
- **AWS** - mongodb is hosted on amazon ec2 instance  


## Homepage
Changing background that fades away making space for a new background to show.

![Alt text](images/homepage1.png?raw=true)  

![Alt text](images/homepage2.png?raw=true)  

## Show all Campgrounds
![Alt text](images/campgrounds.png?raw=true) 

## Selected Campground
![Alt text](images/selected_campground.png?raw=true)  

## Sign Up
![Alt text](images/signup.png?raw=true)  

## Log in
![Alt text](images/login.png?raw=true)  

## Add new campground
![Alt text](images/addnewcampground.png?raw=true)  

## Add new comment
![Alt text](images/addnewcomment.png?raw=true)  


## Deployment:

- In the app.js use - > mongoose.connect('mongodb://localhost/yelp_camp'); (if mongodb is running on localhost).  
- I have used -> mongoose.connect(process.env.DATABASEURL); and have set DATABASEURL as environment variable in my heroku to maintain security.



 




