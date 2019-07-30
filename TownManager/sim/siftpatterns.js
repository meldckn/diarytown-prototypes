registerSiftingPattern('sawThreeAnimals', [
  '?e1 "eventType" "seeCuteAnimal"',
  '?e2 "eventType" "seeCuteAnimal"',
  '?e3 "eventType" "seeCuteAnimal"',
  '(< ?e1 ?e2 ?e3)',
  '?e1 "actor" ?c1',
  '?e2 "actor" ?c1',
  '?e3 "actor" ?c1',
  '?c1 "name" ?n1'
]);
