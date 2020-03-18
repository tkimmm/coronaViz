import { Visual } from "../../src/visual";
var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];

var coronaViz58FE294D2E2247189F315D48BA0FAA33 = {
    name: 'coronaViz58FE294D2E2247189F315D48BA0FAA33',
    displayName: 'CoronaViz',
    class: 'Visual',
    version: '1.0.0',
    apiVersion: '2.6.0',
    create: (options) => {
        if (Visual) {
            return new Visual(options);
        }

        console.error('Visual instance not found');
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["coronaViz58FE294D2E2247189F315D48BA0FAA33"] = coronaViz58FE294D2E2247189F315D48BA0FAA33;
}

export default coronaViz58FE294D2E2247189F315D48BA0FAA33;