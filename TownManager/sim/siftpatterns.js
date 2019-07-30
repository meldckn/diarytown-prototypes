registerSiftingPattern('sawThreeAnimals', [
  '?e1 eventType seeCuteAnimal',
  '?e2 eventType seeCuteAnimal',
  '?e3 eventType seeCuteAnimal',
  '(< ?e1 ?e2 ?e3)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?e3 actor ?c1',
  '?c1 name ?n1'
]);

registerSiftingPattern('sawThreeAnimalsWithNoBreaks', [
  '?e1 eventType seeCuteAnimal',
  '?e2 eventType seeCuteAnimal',
  '?e3 eventType seeCuteAnimal',
  '(< ?e1 ?e2 ?e3)',
  '?e1 actor ?c1',
  '?e2 actor ?c1',
  '?e3 actor ?c1',
  '?c1 name ?n1',
  '(not-join [?c1 ?e1 ?e2]\
     [?eMid "actor" ?c1]\
     [(< ?e1 ?eMid ?e2)])',
  '(not-join [?c1 ?e2 ?e3]\
     [?eMid "actor" ?c1]\
     [(< ?e2 ?eMid ?e3)])',
]);
