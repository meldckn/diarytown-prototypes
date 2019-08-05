registerSiftingPattern('movedAndMissingSomeone', [
  '?e1 eventType moved',
  '?e2 eventType missing-someone',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  //'?c2 name ?n2',
  //'(not= ?c1 ?c2)'
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "moved"])'
]);

registerSiftingPattern('readAndGoodIdea', [
  '(or [?e1 "eventType" "read"]\
      [?e1 "eventType" "finished-book"])',
  '?e2 eventType good-idea',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
      [?eMid "actor" ?c1]\
      [(< ?e1 ?eMid ?e2)])'
]);

registerSiftingPattern('wentToPartyAndDinedOut', [
  '?e1 eventType went-to-party',
  '?e2 eventType dined-out',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "went-to-party"])'
]);

registerSiftingPattern('hobbyAndExercised', [
  '?e1 eventType hobby',
  '?e2 eventType exercised',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "hobby"])'
]);

registerSiftingPattern('niceConvoAndHeardFrom', [
  '?e1 eventType nice-convo',
  '?e2 eventType heard-from',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
      [?eMid "actor" ?c1]\
      [(< ?e1 ?eMid ?e2)])'

]);

registerSiftingPattern('playGameAndAvoidResponsibility', [
  '?e1 eventType played-game',
  '?e2 eventType avoided-responsibility',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
      [?eMid "actor" ?c1]\
      [(< ?e1 ?eMid ?e2)])'
]);

registerSiftingPattern('gotHelpAndFinishedWork', [
  '?e1 eventType got-help',
  '?e2 eventType finished-work',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "got-help"])'
]);

registerSiftingPattern('shoppedAndFeltExcited', [
  '?e1 eventType shopped',
  '?e2 eventType feltHappy',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)])'
]);

registerSiftingPattern('wentHomeAndWatchedTV', [
  '?e1 eventType went-home',
  '?e2 eventType watched',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "went-home"])'
]);

registerSiftingPattern('daydreamedAndDidNothing', [
  '?e1 eventType daydreamed',
  '?e2 eventType did-nothing',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)])'
]);

registerSiftingPattern('helpedSomeoneAndNiceConvo', [
  '?e1 eventType helped-somone',
  '?e2 eventType nice-convo',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "helped-someone"])'
]);

registerSiftingPattern('hungOutAndChattedWithSomeone', [
  '?e1 eventType hung-out',
  '?e2 eventType chattedWithSomeone',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "hung-out"])'
]);

registerSiftingPattern('meditatedAndAdventures', [
  '?e1 eventType meditated',
  '?e2 eventType adventured',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "meditated"])'
]);

registerSiftingPattern('avoidedResponsibilityAndDidNothing', [
  '?e1 eventType avoided-responsibility',
  '?e2 eventType did-nothing',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "avoided-responsibility"])'
]);

registerSiftingPattern('sickAndMessedUp', [
  '?e1 eventType sick',
  '?e2 eventType messed-up',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "sick"])'
]);

registerSiftingPattern('internetedAndDidNothing', [
  '?e1 eventType internet',
  '?e2 eventType didNothing',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
    [?eMid "actor" ?c1]\
    [(< ?e1 ?eMid ?e2)]\
    [?eMid "eventType" "internet"])'
]);