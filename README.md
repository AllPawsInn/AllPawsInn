# Overview
This repo contains a basic structure for [Electron](https://electron.atom.io/) apps which use [React](https://facebook.github.io/react/)

## Setup
Run the following commands in your terminal (you need [Node.js](https://nodejs.org/en/)):

1. Navigate to a folder you want the app to be in and then clone the repo:  
    ```sh
    git clone https://github.com/AllPawsInn/AllPawsInn.git
    ```
2. Navigate into your newly created folder 'AllPawsInn':  
    ```sh
    cd AllPawsInn
    ```

3. Install all requirements:  
    ```sh
    npm install
    ```
4. Make sure you have SQL Server and SQL Server Management Tool (SSMS) is setup on your system.

5. In order to restore database from a backup [this guide](https://www.howtogeek.com/50354/restoring-a-sql-database-backup-using-sql-server-management-studio)  can be followed.

5. Run the following queries after setting up the database:
   ```sh
   ALTER TABLE dbo.BookingObjects ADD Days VARCHAR (255)
   ```

   ```sh
   UPDATE dbo.BookingObjects SET Days = 'm'
   ```
   
   ```sh
   UPDATE dbo.BookingObjects SET Status= 'CO'
   ```
5. Modify the sqlConfig.js file on the path "src/js/sqlConfig.js" with YOUR sql server configuration.

6. To launch your app in development mode
    ```sh
    npm start

7. Publish Versions for a specific platform

    Mac
    ```sh
    npm run package-mac
    ```

    Windows
    ```sh
    npm run package-win
    ```

    Linux
    ```sh
    npm run package-linux
    ```
## Task List   
List of things to be fixed, or impelemented in the application:
   * Adding a date picker to the booking screens
     
   * Making the booking bars in the grid view of the boarding screen, interactable (e.g. "right click should open a dropdown which
     lets the user to select an action like check-in/out, or edit")
      
   * Adding a dropdown to the payment page which lets the user to select extra items to add to the cost (e.g. "nails, grooming,              etc.")
    
   * Adding a basic stats page (an example could be found in the screenshots folder)
    
   * Adding Alert/Notification boxes to the main screen (an example could be found in the screenshots folder)
    
   * Making a better design for pages like booking, new booking, and payment
    
   * Adding an admin panel where user can change default values like DaycareRate, BoardingRate, Discount, etc.
   
   * Adding a component for printing multiple pages of scheduling info (kennel id, food, medical cond., kennel size, etc.) with one click (the user shouldn't have to select each dog seperately)
   
   * Data cleansing (detecting and correcting corrupt or inaccurate records in the database)
  
   * Solving the click glitch that occurs on the grid view of the daycare screen (the user has to click twice to make a reservation for a new day)
   
   * Adding multiple daycare bookings functionality to search results (the user should be able to select more than one record in the search results, and make daycare booking for them - right know this functionality is only available for new reservation (boarding))
   
   * Adding finance management pages (this topic should be discussed with All Paws Inn and requirements should be clarified)
   
   * Migrating the data recorded by All Paws Inn between November 2017 - May 2018, to the database (their system was down between those months, so they recorded everything on paper, or Excel files)
   
   * Adding 'mail to' component which they've asked for notifying customers
   
   * Talking about the signature pad issue (whether they still want it)
   
   * Changing the design of the printed pages (should be talked with All Paws Inn)
   
   * Adding the ability to make recurring bookings (e.g. "make a booking for Max Deus which occurs every Wednesday")
