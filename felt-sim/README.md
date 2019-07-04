# felt-sim
A simulation of a bunch of autonomous characters based on the Felt simulation / story sifting engine.

## Project Structure
* `js/util.js`: Defines utility functions, including a bunch for interacting with the underlying [DataScript](https://github.com/tonsky/datascript) database.
* `js/engine.js`: Defines the core Felt simulation / story sifting engine. Effect handlers are also defined here for now, although this may change in the future.
* `js/actions.js`: Defines all the actions that can take place in the simulation. If you want to add more actions for characters to perform, start here.
* `js/app.js`: Ties together all the other JavaScript code into a single unified application. Includes the code that initializes the database with a cast of characters, sets up the simulation run loop, displays actions on the page as they're performed, and handles user interaction.
