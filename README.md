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

5. Run the following queries after setting up the database
    - ALTER TABLE dbo.BookingObjects
      ADD Days VARCHAR (255)

    - UPDATE dbo.BookingObjects
      SET Days = 'm'

    - UPDATE dbo.BookingObjects
      SET Status= 'CO'

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
