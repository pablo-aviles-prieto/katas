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
    nextLightConcurrentTimesStart: 1,
  },
  O: {
    maxConcurrentTimes: 1,
    nextLight: 'R',
    nextLightConcurrentTimesStart: 1,
  },
  R: {
    maxConcurrentTimes: 5,
    nextLight: 'G',
    nextLightConcurrentTimesStart: 1,
  },
};

const updateLight = (
  currentLight: string,
  concurrentTimes: number,
  lightMapper: Record<string, any>
): [string, number] => {
  const lightInfo = lightMapper[currentLight as keyof typeof lightMapper];
  if (concurrentTimes > lightInfo.maxConcurrentTimes) {
    return [lightInfo.nextLight, lightInfo.nextLightConcurrentTimesStart + 1];
  }
  return [currentLight, concurrentTimes + 1];
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

  let printCar = true;

  for (let i = 0; i <= n; i++) {
    [currentFirstLight, firstLightConcurrentTimes] = updateLight(
      currentFirstLight,
      firstLightConcurrentTimes,
      lightsMapper
    );
    [currentSecondLight, secondLightConcurrentTimes] = updateLight(
      currentSecondLight,
      secondLightConcurrentTimes,
      lightsMapper
    );

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

    if (prevCarIndex + 1 === road.length) {
      printCar = false;
      // roadSimulations.push(newRoad.join(''));
      // continue;
    }

    if (printCar) {
      if (newRoad[nextCarIndex] === 'R' || newRoad[nextCarIndex] === 'O') {
        newRoad[prevCarIndex] = 'C';
      } else {
        newRoad[nextCarIndex] = 'C';
      }
    }

    roadSimulations.push(newRoad.join(''));
  }

  return roadSimulations;
};

const traffic = trafficLightsOneCar({
  road: 'C...R............G......',
  n: 10,
});
const traffic2 = trafficLightsOneCar({
  road: 'C....G........R...',
  n: 25,
});
console.log('traffic', traffic);
console.log('traffic2', traffic2);
