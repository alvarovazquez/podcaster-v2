# podcaster-v2
A new version of the Podcaster App made with **React** and **Redux**

### Prerequisites
In order to be able to run this web application succesfully, you need **Node Package Manager** previously installed in your computer.

For more information: 
* Install **Node Package Manager**: https://www.npmjs.com/get-npm

### Instructions to run this application
#### Clone this repository
Run `git clone https://github.com/alvarovazquez/podcaster-v2.git`

#### Go to repository folder
Run `cd podcaster-v2`

#### Install dependencies
Run `npm install`

#### Prepare/run the application
There are two ways for preparing the application:
 * For **development** mode (non minified assets) run `npm start`. This will start a development server on port 3000 on your local machine and will hot reload any changes on your source code.
 * For **production** mode (minified assets) run `npm run build`. This will generate a production optimized version of the product in the `build` folder.

#### Notes
For running the application in a different server than the one provided by Grunt for testing, take into account that this is a [Single Page Application](https://es.wikipedia.org/wiki/Single-page_application) with no HashBang navigation, so you need to redirect all non-asset requests to `/index.html`.

For more information on how to do this please check your server's documentation.

Podcast card heights in the main list are not matched because in the PDF with the requisites they appear not equalled. It wouldn't be hard at all to match them.

If CORS request fails for some reason (proxy), substitute the one in `line 53` of `src/js/main.js` for one of the others that are in the comments above.

#### Credits
* **React**, A JavaScript library for building user interfaces: https://facebook.github.io/react/
* **Redux**, A predictable state container for JavaScript apps: http://redux.js.org/