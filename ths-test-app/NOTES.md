# Tech Task 

For this task I have implemented the individual listing screen which is accessed by clicking on a listing from the Listings screen. Here you will be able to see some basic information about the listing and a carousel of other listings to explore. With the deeplinking added, an individual listing can be accessed from a url and now both the Listings and Listing screens can only be accessed when a user is logged in. 

## Testing it locally:

Pull the Pr locally, run npm install to make sure any new dependencies are installed, then run npm run ios or npm run android to start the app.

- Click the logout button and you should see that the tab at the bottom will disappear and you will not be able to access the Listings or Listing screens.
- Click the login button and you should see that the tab at the bottom will reappear and you will be able to access the Listings and Listing screens.
- Once you navigate to the Listings screen and then go to a single listing, you should see a back button, if you are on the first listing you have clicked this will navigate you back to the Listings screen. 
- I have added a a carousel at the bottom of each individual listing showing other listings to explore, now how I interpreted the task is that you would like the back button to take you back to the previous listing you were on. So when clicking the back button it will navigate you back to the previous listing you were on. This is something I feel would warrent a design discussion as it is not the most user friendly experience. Would it be worth adding a home button to navigate back to the Listings screen? 
- Deeplinking has been added to the app, with this you can navigate to a specific listing by running: npx uri-scheme open "thstestapp://listing?id=[listingId]" --ios|android
This will then open the app and navigate you to the listing with the id of which you have specified.
-If you are on web, make sure you have your expo running for web with: npx expo start --web and then you can use http://localhost:8082/listing?id=[listingId] to access a specific listing.
- Neither of these deeplinks will take you to the listing screen if you are not logged in.
- Currently when there is an issue with fetching a listing I have used the built in Alert from react Native to show an error message. 
- Run tests with npm run test

## Future Improvements:

- Make some of the unit tests integration tests. I have used a lot of mocking and while this is not necessarily a bad thing, it can create false confidence in the tests. It would be better to use the handlers and servers already made to test the API calls. This would give a more accurate test of what the app would be like in a real world scenario. It would also be better to use stack navigation within the tests to test the navigation between screens. Rather than mocking. 
- Re look at the alert and how its being used. I have used the built in Alert from react Native and while I like the pop up. It can cause a less ideal situation when using the app. I have used it here as it is a quick and easy way to show an error message. I think there could be a better option of create an reusable alert component that can be used throughout the app for different scenarios, but in this case, could show up below an article if pressed and it is not accessible, thus not blocking a users flow of use. 
- Add data caching and use tanstack query to cache the data. With this, we can make a call in a hook to get the data, cache it and then grab it when needed from the components, rather than making a call every time the component is rendered. This would also allow us to use the tanstack query hooks to handle the loading and error states, as well as the refetching of data when needed. Another perk of adding tanstack query is that it would allow us to use infinite scroll on the Listings screen. Using this means reduce how much data is fetched on a single screen and improve the performance of the app. 