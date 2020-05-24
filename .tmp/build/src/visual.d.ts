import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import { Person } from './interfaces';
export declare class Visual implements IVisual {
    private settings;
    private svg;
    private container;
    private textCounter;
    private host;
    people: any[];
    startStopFlag: any;
    infectedCount: number;
    width: number;
    height: number;
    constructor(options: VisualConstructorOptions);
    createPeopleArray(value: number, currentWidth: number, currentHeight: number): void;
    enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject;
    drawInital(svgObj: Person): void;
    reset(): void;
    update(options: VisualUpdateOptions): void;
    animate(): void;
    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    private static parseSettings;
}
