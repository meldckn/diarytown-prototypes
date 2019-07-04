An action is a JSON object with four key properties: `type`, `find`, `where`, and `event`.

`type` is a concise human-readable string that uniquely identifies this action type.

`find` is a string describing the logic variables that we're trying to find values for.
Here we've got four lvars we're trying to bind:
* `?c1` and `?c2`, the integer IDs of two different characters
* `?n1` and `?n2`, the string names of these characters

All logic variables start with the `?` character in the `find` and `where` clauses;
this is a DataScript convention that we could probably change if we wanted.

`where` is a list of logic sentences describing the conditions under which the logic variables
we specified can be bound to values. In the `where` clause here we introduce an extra, implicit
logic variable `?dislike`, which will bind to an "attitude token" representing an instance of
`?c1` feeling dislike toward `?c2`.
We also have an extra `(not= ?c1 ?c2)` bit to make sure `?c1` and `?c2` aren't the same character;
this is DataScript-specific syntax, which we could again probably create syntax sugar for if we wanted.

`event` is a function that receives a single argument:
all the bound variables from the `find` clause, packed into a single JSON object.
The `event` function returns an object describing an "event".

An event might have:
* An `actor` (a character ID)
* A `target` (another character ID)
* Zero or more `effects` (descriptions of stuff to update in the database)
* A player-visible `text` description

When an action is performed, we add the resulting event to the database,
so that later queries can call up past events.
We also implicitly add the action's `type` as the `type` property of the resulting event,
so that we can query for (e.g.) `'betray'` events specifically.

In our case, running the `betray` action also adds a new "attitude token" to the database,
representing `?c2`'s newfound dislike for `?c1` as a result of the betrayal.
The attitude token entity we create will implicitly have a `cause` property added to it:
the numeric ID of the event that caused this attitude to form.
This is true of all attitude tokens created in the process of performing actions.

Under the hood, all the game state is just stored in a big database of 3-tuples.
Each 3-tuple has the form `[entity_id, property, value]`,
where `entity_id` is always an integer and `property` is always a string.
`value` might be a primitive value; it might also be the ID of another entity.
This is just like ASP's `predicate(something,something_else,etc)` but more restricted:
if you want to add state to the relationship between two entities,
you need to create a third entity that points at the two entities in question
and attach the extra state to that.
(This is why we have attitude tokens as distinct database entities here, for example.)

We'll have a big array of actions defined in the same way as our `exampleAction` here,
and run their query parts in order to figure out which actions are allowed at any given point.
"Framings" or "interpretations" of player diary entries could use basically the same architecture,
potentially giving players a choice between multiple valid interpretations of the same events.
