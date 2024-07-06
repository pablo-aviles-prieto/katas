/*
 ** https://www.codewars.com/kata/5d0ae91acac0a50232e8a547
 **
 ** 6 KYU
 */

interface params {
  road: string;
  n: number;
}

const lightsMapper = {
  G: {
    maxConcurrentTimes: 5,
    nextLight: 'O',
    nextLightConcurrentTimesStart: 0,
  },
  O: {
    maxConcurrentTimes: 1,
    nextLight: 'R',
    nextLightConcurrentTimesStart: 0,
  },
  R: {
    maxConcurrentTimes: 5,
    nextLight: 'G',
    nextLightConcurrentTimesStart: 1,
  },
};

const trafficLightsOneCar = ({ road, n }: params) => {
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
    // console.log('currentFirstLight', currentFirstLight);
    // console.log('firstLightConcurrentTimes', firstLightConcurrentTimes);

    // Changing first light
    const assertedFirstLight = currentFirstLight as keyof typeof lightsMapper;
    if (
      firstLightConcurrentTimes >
      lightsMapper[assertedFirstLight].maxConcurrentTimes
    ) {
      currentFirstLight = lightsMapper[assertedFirstLight].nextLight;
      firstLightConcurrentTimes =
        lightsMapper[assertedFirstLight].nextLightConcurrentTimesStart;
    }
    firstLightConcurrentTimes++;

    // Changing second light
    const assertedSecondLight = currentSecondLight as keyof typeof lightsMapper;
    if (
      secondLightConcurrentTimes >
      lightsMapper[assertedSecondLight].maxConcurrentTimes
    ) {
      currentFirstLight = lightsMapper[assertedSecondLight].nextLight;
      secondLightConcurrentTimes =
        lightsMapper[assertedSecondLight].nextLightConcurrentTimesStart;
    }
    secondLightConcurrentTimes++;

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
};

const traffic = trafficLightsOneCar({
  road: 'C...R............G......',
  n: 10,
});
console.log('traffic', traffic);
