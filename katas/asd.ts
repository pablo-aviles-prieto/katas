export function trafficLights(road: string, n: number): string[] {
  const roadArray = road.split('');

  const firstRedLightIndex = Number(
    roadArray.findIndex((roadElement) => roadElement === 'R') ?? '0'
  );
  const firstGreenLightIndex = Number(
    roadArray.findIndex((roadElement) => roadElement === 'G') ?? '0'
  );
  const firstLightIndex = Math.min(firstRedLightIndex, firstGreenLightIndex);
  const secondLightIndex = Math.max(firstRedLightIndex, firstGreenLightIndex);

  let currentFirstLight = roadArray[firstLightIndex];
  let currentSecondLight = roadArray[secondLightIndex];
  let firstLightConcurrentTimes = 1;
  let secondLightConcurrentTimes = 1;

  const roadSimulations: string[] = [];
  const roadBluePrint = Array.from({ length: road.length }, () => '.');

  for (let i = 0; i <= n; i++) {
    // Changing first light
    if (currentFirstLight === 'G') {
      if (firstLightConcurrentTimes > 5) {
        currentFirstLight = 'O';
        firstLightConcurrentTimes = 0;
      }
      firstLightConcurrentTimes++;
    }
    if (currentFirstLight === 'O') {
      if (firstLightConcurrentTimes > 1) {
        currentFirstLight = 'R';
        firstLightConcurrentTimes = 1;
      } else {
        firstLightConcurrentTimes++;
      }
    }
    if (currentFirstLight === 'R') {
      if (firstLightConcurrentTimes > 5) {
        currentFirstLight = 'G';
        firstLightConcurrentTimes = 1;
      }
      firstLightConcurrentTimes++;
    }

    // Changing second light
    if (currentSecondLight === 'G') {
      if (secondLightConcurrentTimes > 5) {
        currentSecondLight = 'O';
        secondLightConcurrentTimes = 0;
      }
      secondLightConcurrentTimes++;
    }
    if (currentSecondLight === 'O') {
      if (secondLightConcurrentTimes > 1) {
        currentSecondLight = 'R';
        secondLightConcurrentTimes = 1;
      } else {
        secondLightConcurrentTimes++;
      }
    }
    if (currentSecondLight === 'R') {
      if (secondLightConcurrentTimes > 5) {
        currentSecondLight = 'G';
        secondLightConcurrentTimes = 1;
      }
      secondLightConcurrentTimes++;
    }

    if (i === 0) {
      roadSimulations.push(road);
      continue;
    }

    const newRoad = [...roadBluePrint];

    // Adding the new lights on the road
    newRoad[firstLightIndex] = currentFirstLight;
    newRoad[secondLightIndex] = currentSecondLight;

    const prevCarIndex = roadSimulations[roadSimulations.length - 1]
      .split('')
      .findIndex((elem) => elem === 'C');
    const nextCarIndex = (prevCarIndex + 1) % road.length;

    if (newRoad[nextCarIndex] === 'R') {
      newRoad[prevCarIndex] = 'C';
    } else {
      newRoad[nextCarIndex] = 'C';
    }

    roadSimulations.push(newRoad.join(''));
  }

  return roadSimulations;
}
