interface Params {
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

const trafficLightsOneCar = ({ road, n }: Params) => {
  const roadArray = road.split('');

  // Find all traffic lights and their positions
  const trafficLights: {
    position: number;
    state: string;
    concurrentTimes: number;
  }[] = [];
  roadArray.forEach((element, index) => {
    if (element === 'G' || element === 'R') {
      trafficLights.push({
        position: index,
        state: element,
        concurrentTimes: 1,
      });
    }
  });

  const roadSimulations: string[] = [];
  const roadBluePrint = Array.from({ length: road.length }, () => '.');

  // In case that the car finished the road, just not printing it anymore
  let printCar = true;

  for (let i = 0; i <= n; i++) {
    // Update each light
    trafficLights.forEach((light, idx) => {
      const [newState, newConcurrentTimes] = updateLight(
        light.state,
        light.concurrentTimes,
        lightsMapper
      );
      trafficLights[idx].state = newState;
      trafficLights[idx].concurrentTimes = newConcurrentTimes;
    });

    if (i === 0) {
      roadSimulations.push(road);
      continue;
    }

    const newRoad = [...roadBluePrint];

    // Adding the new lights on the road
    trafficLights.forEach((light) => {
      newRoad[light.position] = light.state;
    });

    const prevCarIndex = roadSimulations[roadSimulations.length - 1]
      .split('')
      .findIndex((elem) => elem === 'C');

    const nextCarIndex = (prevCarIndex + 1) % road.length;

    if (prevCarIndex + 1 === road.length) {
      printCar = false;
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
console.log('traffic', traffic);

const traffic2 = trafficLightsOneCar({
  road: 'CG..G..R...G...G...',
  n: 19,
});
console.log('traffic2', traffic2);
