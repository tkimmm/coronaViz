import powerbi from "powerbi-visuals-api";
import PrimitiveValue = powerbi.PrimitiveValue;

export interface VizData {
  population: PrimitiveValue;
}

export interface Person {
  posX: number;
  posY: number;
  color: string;
  radius: any; 
  jumpSize: number;
  svg: any;
  id: string; 
  aoa: number;
  weight: number;
  data: string;
  infectStatus: boolean;
  vx: number;
  vy: number;
  initialVx: number;
  initialVy: number;
  initialPosX: number;
  initialPosY: number;
}

export interface CoronaVisualViewModel {
  dataPoints: DataPoint[];
  settings?: CoronaVisualSettings;
}

export interface DataPoint {
  category?: object;
  value: PrimitiveValue;
  color?: string;
  format?: string;
}

export interface CoronaVisualSettings {
  customSettings: {
    show: boolean;
    fill: string;
    numberOfPeople: PrimitiveValue;
  };
}