export interface MetaData {
  name?: string;
}

export interface SessionResults {
  sessionType: string;
  trackName: string;
  sessionIndex: number;
  sessionResult: SessionResult;
  laps?: (LapsEntity)[] | null;
  penalties?: (PenaltiesEntity)[] | null;
}
export interface SessionResult {
  bestlap: number;
  bestSplits?: (number)[] | null;
  isWetSession: number;
  type: number;
  leaderBoardLines?: (LeaderBoardLinesEntity)[] | null;
}
export interface LeaderBoardLinesEntity {
  car: Car;
  currentDriver: DriversEntityOrCurrentDriver;
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
  drivers?: (DriversEntityOrCurrentDriver)[] | null;
}
export interface DriversEntityOrCurrentDriver {
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
  splits?: (number)[] | null;
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
