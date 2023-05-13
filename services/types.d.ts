export interface MetaData {
  name?: string;
}

export interface CarAndDriver {
  id: number;
  driver: Driver;
  car: Pick<Car, "raceNumber" | "carModel" | "teamName">;
}

export interface LapTimeResult {
  lap: number;
  splits: number[];
}

export interface SessionResults {
  sessionType: string;
  trackName: string;
  sessionIndex: number;
  sessionResult: SessionResult;
  laps: (LapsEntity)[] | null;
  penalties?: (PenaltiesEntity)[] | null;
}
export interface SessionResult {
  bestlap: number;
  bestSplits: (number)[] | null;
  isWetSession: number;
  type: number;
  leaderBoardLines?: (LeaderBoardLinesEntity)[] | null;
}
export interface LeaderBoardLinesEntity {
  car: Car;
  currentDriver: Driver;
  currentDriverIndex: number;
  timing: Timing;
  missingMandatoryPitstop: number;
  driverTotalTimes?: (number)[] | null;
}
export interface Car {
  carId: number;
  raceNumber: number;
  carModel: number;
  cupCategory: number;
  teamName: string;
  drivers: (Driver)[];
}
export interface Driver {
  firstName: string;
  lastName: string;
  shortName: string;
  playerId: string;
}
export interface Timing {
  lastLap: number;
  lastSplits?: (number)[] | null;
  bestLap: number;
  bestSplits?: (number)[] | null;
  totalTime: number;
  lapCount: number;
  lastSplitId: number;
}
export interface LapsEntity {
  carId: number;
  driverIndex: number;
  laptime: number;
  isValidForBest: boolean;
  splits: (number)[];
}
export interface PenaltiesEntity {
  carId: number;
  driverIndex: number;
  reason: string;
  penalty: string;
  penaltyValue: number;
  violationInLap: number;
  clearedInLap: number;
}
