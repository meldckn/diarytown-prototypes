registerSiftingPattern('movedAndMissingSomeone', [
  '?e1 eventType moved',
  '?e2 eventType missing-someone',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
  //'?c2 name ?n2',
  //'(not= ?c1 ?c2)'
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
  '?c1 name ?n1'
]);

registerSiftingPattern('hobbyAndExercised', [
  '?e1 eventType hobby',
  '?e2 eventType exercised',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('niceConvoAndHeardFrom', [
  '?e1 eventType nice-convo',
  '?e2 eventType heard-from',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('playGameAndAvoidResponsibility', [
  '?e1 eventType played-game',
  '?e2 eventType avoided-responsibility',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('gotHelpAndFinishedWork', [
  '?e1 eventType got-help',
  '?e2 eventType finished-work',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('shoppedAndFeltExcited', [
  '?e1 eventType shopped',
  '?e2 eventType feltHappy',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('wentHomeAndWatchedTV', [
  '?e1 eventType went-home',
  '?e2 eventType watched',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('daydreamedAndDidNothing', [
  '?e1 eventType daydreamed',
  '?e2 eventType did-nothing',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('helpedSomeoneAndNiceConvo', [
  '?e1 eventType helped-somone',
  '?e2 eventType nice-convo',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('hungOutAndChattedWithSomeone', [
  '?e1 eventType hung-out',
  '?e2 eventType chattedWithSomeone',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('meditatedAndAdventures', [
  '?e1 eventType meditated',
  '?e2 eventType adventured',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('avoidedResponsibilityAndDidNothing', [
  '?e1 eventType avoided-responsibility',
  '?e2 eventType did-nothing',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('sickAndMessedUp', [
  '?e1 eventType sick',
  '?e2 eventType messed-up',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('internetedAndDidNothing', [
  '?e1 eventType internet',
  '?e2 eventType didNothing',
  '(< ?e1 ?e2)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?c1 name ?n1'
]);