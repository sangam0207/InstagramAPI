# InstagramAPI

User Registration and Authentication:

I start by implementing a user registration system where users can sign up with their email and password.
User data is saved in a MongoDB database, which is a common choice for storing user information securely.
User Login:

After successful registration, users can log in using their registered email and password. This ensures that only authenticated users can access their Instagram metrics and posts.
Instagram Account Connection:

Once logged in, users have the option to connect their Instagram account to the application.
 I used a test Instagram account for this task, which is a practical approach for development and testing.
Dashboard:

The main part of my application is the dashboard where users can view key metrics and posts from their connected Instagram account.
Metrics like total followers, total posts, average likes per post, and average comments per post are displayed, providing users with insights into their account's performance.
I planED to display at least 5 recent posts with captions and images, which gives users a quick snapshot of their recent activity.
API Integration:

To fetch Instagram data, i intend to use an API, such as Rapid API ,In Place of the Instagram Graph API .Firstly I used Instagram Graph API but this api did not provide me all data of user , So I searched a third party which give me all information about for the public account user then I got rapid API ,Which fullfilled this project's need. 
I make API requests with the username of the connected Instagram account, which is stored in a name.txt file.
The API responses will provide user profile information, including the profile picture, username, full name, and post details like captions, likes, and comments.
And here I use a dummy json data for my project which i got from rapidApi.
This was my approch to do this task.
