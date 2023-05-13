import {
  CarAndDriver,
  LapsEntity,
  LapTimeResult,
  LeaderBoardLinesEntity,
  SessionResults,
} from "./types.d.ts";

export const getLapsPerDriver = (results: SessionResults) => {
  const drivers_by_car_id = getDriverByCarId(
    results.sessionResult.leaderBoardLines || [],
  );

  console.log(
    Object.keys(drivers_by_car_id).length + "participated in session",
  );

  const laps_by_driver: { [key: string]: LapTimeResult[] } = getLapsByCAD(
    drivers_by_car_id,
    results.laps || [],
  );

  // merge down to have single best lap
  const single_best_lap_by_driver: { [key: string]: LapTimeResult } = {};

  for (const driver of Object.keys(laps_by_driver)) {
    single_best_lap_by_driver[driver] = laps_by_driver[driver][0];
  }

  return single_best_lap_by_driver;
};

const getDriverByCarId = (leaderBoardLines: LeaderBoardLinesEntity[]) => {
  const drivers_by_car_id: { [key: string]: CarAndDriver } = {
    // "3001": { id, car, driver };
  };

  (leaderBoardLines).map((line) => {
    const _car = line.car;
    drivers_by_car_id[_car.carId] = {
      id: _car.carId,
      driver: line.currentDriver,
      car: {
        "raceNumber": _car.raceNumber,
        "carModel": _car.carModel,
        "teamName": _car.teamName,
      },
    };
  });

  return drivers_by_car_id;
};

const getLapsByCAD = (
  drivers_by_car_id: { [key: string]: CarAndDriver },
  laps: LapsEntity[],
) => {
  const laps_by_driver: { [key: string]: LapTimeResult[] } = {
    // playerId: { lap, splits, carAndDriver }
  };

  // iterate all laps and store all by driver/car combo
  for (const lap of laps) {
    if (lap.isValidForBest === false) continue;
    const carAndDriver = drivers_by_car_id[lap.carId];

    const times = laps_by_driver[carAndDriver.driver.playerId] || [];
    times.push({
      lap: lap.laptime,
      splits: lap.splits,
    });

    // sort lower times to appear first
    times.sort((t1, t2) => {
      return t1.lap - t2.lap;
    });

    laps_by_driver[carAndDriver.driver.playerId] = [...times];
  }

  return laps_by_driver;
};
