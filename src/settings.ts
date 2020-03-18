/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";
import powerbi from "powerbi-visuals-api";
import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import DataViewObjects = powerbi.DataViewObjects;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import Fill = powerbi.Fill;

export class VisualSettings extends DataViewObjectsParser {
      public dataPoint: dataPointSettings = new dataPointSettings();
      public customSettings: customSettings = new customSettings();
      }

export function getValue<T>(
        objects: DataViewObjects,
        objectName: string,
        propertyName: string,
        defaultValue: T
      ): T {
        if (objects) {
          let object = objects[objectName];
          if (object) {
            let property: T = <T>object[propertyName];
            if (property !== undefined) {
              return property;
            }
          }
        }
        return defaultValue;
      }
      
export function getTextFillColor(
        objects: DataViewObjects,
        colorPalette: ISandboxExtendedColorPalette,
        defaultColor: string
      ): string {
        if (colorPalette.isHighContrast) {
          return colorPalette.foreground.value;
        }
        return getValue<Fill>(objects, "customSetting", "fill", {
          solid: {
            color: defaultColor
          }
        }).solid.color;
      }
      

export class dataPointSettings {
     // Default color
      public defaultColor: string = "";
     // Show all
      public showAllDataPoints: boolean = true;
     // Fill
      public fill: string = "";
     // Color saturation
      public fillRule: string = "";
     // Text Size
      public fontSize: number = 12;
     }

export class customSettings {
  public numberOfPeople: number = 5;
}