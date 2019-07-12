/// QUERY BOX STUFF

function isValidLiteral(s) {
  return (['true','false','nil'].indexOf(s) > -1) ||
         (!Number.isNaN(parseFloat(s))) ||
         (s.length >= 2 && s[0] === '"' && s[s.length - 1] === '"');
}

function parseUserQueryLine(line) {
  // strip leading/trailing singlequotes & trailing commas from copy-pasted action :where clauses
  line = line.replace(/^'/, '').replace(/,$/, '').replace(/'$/, '');

  let clauseType = null;
  let lvars = [];
  let parts = line.split(/\s+/g);
  let clause = '';
  if (line[0] === '(') {
    // handle complex clause: `(or [eid property value]+)` or `(rule arg+)` or `(function arg+) result-lvar`
    clauseType = 'complex';
    clause = line;
    for (let part of parts) {
      // strip leading open-{parens,square-brackets} and trailing close-{parens,square-brackets}
      let partWithoutParens = part.replace(/^[\(\[]/, '').replace(/[\)\]]$/, '');
      if (partWithoutParens[0] === '?') {
        lvars.push(partWithoutParens);
      }
    }
  } else {
    // handle simple clause: `eid property value`
    clauseType = 'simple';
    if (parts.length !== 3) {
      return; // bail out if can't parse this line
    }
    for (let part of parts) {
      if (part[0] === '?') {
        lvars.push(part);
      } else if (!isValidLiteral(part)) {
        // wrap in quotes if not already wrapped (and not a literal number, boolean, or nil)
        part = '"' + part + '"';
      }
      clause += part + ' ';
    }
  }
  if (parts[0] !== '(or') {
    clause = '[' + clause + ']';
  }
  return {clauseType: clauseType, clause: clause, lvars: lvars, original: line};
}

function parseUserQuery(userQuery) {
  userQuery = userQuery.trim();

  // check for @actionName as beginning of query; if present, use that action's query
  if (userQuery[0] === '@') {
    let actionName = userQuery.split(/\s+/)[0].substring(1);
    let action = actionLibrary[actionName];
    if (action) {
      return {query: action.query, lvars: action.lvars.map(l => '?' + l), original: userQuery};
    }
  }

  let lines = userQuery.split('\n');
  lines = lines.map(l => l.trim());
  lines = lines.filter(l => l.length > 0);
  let clauses = lines.map(parseUserQueryLine);

  let lvars = [];
  for (let clause of clauses) {
    lvars = lvars.concat(clause.lvars);
  }
  lvars = distinct(lvars);
  if (lvars.length === 0) return null; // bail out if no lvars to find

  let finalQuery = '[:find ' + lvars.join(' ');
  finalQuery += ' :where ';
  finalQuery += clauses.map(c => c.clause).join();
  finalQuery += ']';

  return {query: finalQuery, clauses: clauses, lvars: lvars, original: userQuery};
}

function runUserQuery() {
  let query, results;
  try {
    query = parseUserQuery(queryInput.value);
    results = datascript.q(query.query, gameDB).sort((a, b) => a[0] - b[0]);
  } catch(err) {
    return; // bail out if no valid query or results
  }

  // remove all rows from table
  for (let i = queryResults.rows.length - 1; i >= 0; i--) {
    queryResults.deleteRow(i);
  }

  // add header row with all lvars
  let headerRow = queryResults.insertRow();
  for (let lvar of query.lvars) {
    let cell = headerRow.insertCell();
    cell.innerText = lvar.replace(/^\?/, '');
  }

  // add a row for each query result
  for (let result of results) {
    let row = queryResults.insertRow();
    for (let i = 0; i < query.lvars.length; i++) {
      let cell = row.insertCell();
      cell.innerText = result[i];
    }
  }
}

queryInput.onchange = runUserQuery;
queryInput.onkeydown = function(event) {
  if (event.key === 'Enter') {
    runUserQuery();
  }
};
