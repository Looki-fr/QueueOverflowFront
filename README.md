# QueueOverflowFront

## Demontration video 
https://youtu.be/6Y0aVnNIzIk

## How to locally run the website 

1) Install node and npm \
If you don’t have node and npm installed, you need to follow this quick guide : https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-nodejs-and-npm 

2) Install sql and setting up the database 
   
  In order to install MySql please follow this guide (https://dev.mysql.com/doc/workbench/en/wb-installing.html). \
  You will then need to create a connection, you can do so following this guide (https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html). \
  Note : You may need to update the password and username put inside the QueueOverflowBack/config/database.js file 

  Finally you need to open mysql workbench, connect and create an empty sheme called ‘queueoverflow’, \
  Copy QueueOverflowBack/ dump-queueoverflow.sql  \
  into the C:\Program Files\MySQL\MySQL Server 8.0\bin \
  Note : my version is 8.0 but it might not be the same for you 

  Go into this folder as administrator in a terminal and execute this command :  

  mysql -u root -p queueoverflow  < dump-queueoverflow.sql 
  
3) First create a folder where you will want to put the website code \
Go into the folder using a terminal (in windows you can simply go into this folder using the files exploratory and then right click and press ‘open in terminal’) 

4) Do those command to download the backend :  

git clone https://github.com/Looki-fr/QueueOverflowBack.git \
cd QueueOverflowBack \
git checkout master 

5) Then execute those commands to download the front end 

git clone https://github.com/Looki-fr/QueueOverflowFront.git \
cd QueueOverflowFront\
git checkout master\
npm i

6) Running the backend 

Go into the QueueOverflowBack folder in a terminal and then execute this command :  \
Node ./index.js 

7) Running the front end \
Go into the QueueOverflowFront folder in a terminal and then execute this command :  \
npm start 




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
