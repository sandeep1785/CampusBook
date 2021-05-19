# CampusBook


## Description
The main objective of this project was to create a platform in which studentcan upload their campus pictures so that newbie can see how the campus looks and some unseenplaces where the fresher can go and enjoy their initial time at college campus. It has features likeAuthentication, Authorization, and Functionalities of campus posts and comments. Built using Bootstrap and MEAN stack technologies.



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




## Deployment:

- In the app.js use - > mongoose.connect('mongodb://localhost/yelp_camp'); (if mongodb is running on localhost).  
- I have used -> mongoose.connect(process.env.DATABASEURL); and have set DATABASEURL as environment variable in my heroku to maintain security.



 




