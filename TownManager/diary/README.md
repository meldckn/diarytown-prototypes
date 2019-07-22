# Diarycraft

A protoype of the diary entry crafting UI for Diarytown

## Code Organization
- Controller - The main class, calls functions from and passes data between other modules
- DataWrangler - interfaces with the Loki.js database
- Display - displays things on the screen, manages HTML elements

(Each of the above classes is a singleton class based on http://www.dofactory.com/javascript/singleton-design-pattern = Immediate anonymous function (doesn't have a name, and executes immediately))

- convertSheet.py - A Python utility that converts actions.csv to actions.js
- actions.csv - a spreadsheet of diary entry actions/events downloaded from a Google Sheet
- actions.js - a file of action JSON populated by the convertSheet utility

## Libraries Used
- Loki.js - for storing and querying a local database of actions, etc
- JQuery
- JQueryUI 

## Todo
- [ ] A nice title and description of what this is on index.html
- [ ] Ability to delete an action added to diary entry
- [ ] Clear diary entry
- [ ] Fix action sorting by category
- [ ] Organize the actions better overall
- [ ] Add action category labels
- [ ] Date select
