import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api"
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var coronaViz58FE294D2E2247189F315D48BA0FAA33_DEBUG: IVisualPlugin = {
    name: 'coronaViz58FE294D2E2247189F315D48BA0FAA33_DEBUG',
    displayName: 'CoronaViz',
    class: 'Visual',
    apiVersion: '2.6.0',
    create: (options?: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }

        throw 'Visual instance not found';
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["coronaViz58FE294D2E2247189F315D48BA0FAA33_DEBUG"] = coronaViz58FE294D2E2247189F315D48BA0FAA33_DEBUG;
}

export default coronaViz58FE294D2E2247189F315D48BA0FAA33_DEBUG;