This app is for a tech test, with the idea is a company has an internal dashboard, with an added feature that checks the TFL tube status for each line.

The idea is that users can click the tube line status checker, and then check individual stations to see what the conditions are.


The app utilises React for state management and component building. I decided to add Next.js to the app too, as i wanted to cache data on the server, miimicking if was a live server. That way, it can reduce api calls for each user, especially if it is a large London company. The API only offers 500 requests a minute, which may be problematic with Rush Hour checks. So, caching seemed like a better solution using Next' built-in caching tools. This keeps api costs down and server data handling down too.

# How to get the app to work
To get the app to work, you will need to do the following:
- Go to https://api-portal.tfl.gov.uk/signup and create an account
- When signed up, head to https://api-portal.tfl.gov.uk/signup and then subscribe to the 500 Requests Per Min.
- Give your Subscription a name and proceed. Under your account you should see subscriptions, with a Primary key and Secondary Key
- Now clone the repo by opening your coding terminal and typing `git clone https://github.com/Fandasuba/TFL-Journey-Status`
- Click the tfl-travel-widget folder, and create a new file in the main folder called `env.local`
- Inside env.local type the following: PRIMARY_KEY=.
- Place whatever the primary key code is in your TFL dev account where the = is and save the file. You can do the same for SECONDARY_KEY, but it is not necessary.

You can now type `cd tfl-travel-widget` or type `cd` and press tab to auto select the folder to speed things up. Now type `npm run dev` once you're in the main app folder on your terminal to demo the site.

# To Do List
- Create fake homepage to improve things slightly
- Update styling for the travel line table for underground service checks.
- Update service status for specific lines.