import powerbi from "powerbi-visuals-api";
import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import DataViewObjects = powerbi.DataViewObjects;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
export declare class VisualSettings extends DataViewObjectsParser {
    dataPoint: dataPointSettings;
    customSettings: customSettings;
}
export declare function getValue<T>(objects: DataViewObjects, objectName: string, propertyName: string, defaultValue: T): T;
export declare function getTextFillColor(objects: DataViewObjects, colorPalette: ISandboxExtendedColorPalette, defaultColor: string): string;
export declare class dataPointSettings {
    defaultColor: string;
    showAllDataPoints: boolean;
    fill: string;
    fillRule: string;
    fontSize: number;
}
export declare class customSettings {
    numberOfPeople: number;
}
