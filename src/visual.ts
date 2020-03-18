/*
 *  Power BI Visual CLI
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

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import IViewport = powerbi.IViewport;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import ISandboxExtendedColorPalette = powerbi.extensibility.ISandboxExtendedColorPalette;
import { Person, DataPoint, CoronaVisualSettings, CoronaVisualViewModel } from './interfaces';
import PrimitiveValue = powerbi.PrimitiveValue;
import * as d3 from "d3";
import * as p from "./person";

import { VisualSettings, getValue, getTextFillColor} from "./settings";

const visualTransform = (options: VisualUpdateOptions, host: IVisualHost): CoronaVisualViewModel => {
  let dataViews = options.dataViews;
  let categorical = dataViews[0].categorical;
  let dataValue = categorical.values;
  let viewModel: CoronaVisualViewModel = {
    dataPoints: []
  };
  let visualDefaultSettings: CoronaVisualSettings = {
    customSettings: {
      show: true,
      fill: "#000000",
      numberOfPeople: ""
    },
  };

  let objects = dataViews[0].metadata.objects;
  let colorPalette: ISandboxExtendedColorPalette = host.colorPalette;

  if (
    !dataViews ||
    !dataViews[0] ||
    !dataViews[0].categorical ||
    !dataViews[0].categorical.values
  )
    return viewModel;

  let visualSettings: CoronaVisualSettings = {
    customSettings: {
      show: true,
      fill: getTextFillColor(
        objects,
        colorPalette,
        visualDefaultSettings.customSettings.fill
      ),
      numberOfPeople: getValue<PrimitiveValue>(objects, "customSettings", "numberOfPeople", visualDefaultSettings.customSettings.numberOfPeople)
    }
  };

  let visualDataPoints: DataPoint[] = [];
  for (let i = 0, len = dataValue.length; i < len; i++) {
    visualDataPoints.push({
      category: <object>dataValue[i].source.roles,
      value: <PrimitiveValue>dataValue[i].values[0],
      format: <string>dataValue[i].source.format
    });
  }
  return {
    dataPoints: visualDataPoints,
    settings: visualSettings
  };
}


export class Visual implements IVisual {
  private settings: VisualSettings;
  private svg: d3.Selection<SVGElement, any, any, any>;
  private container: d3.Selection<SVGElement, any, any, any>;
  private textCounter: d3.Selection<SVGElement, any, any, any>;
  private host: IVisualHost;
  public people = [];
  public startStopFlag = null;
  public width = 350;
  public height = 350;
  public infectedCount = 1;
  constructor(options: VisualConstructorOptions) {
    this.host = options.host;
    this.svg = d3.select(options.element)
    .append('svg')

    this.container = this.svg.append("g")
    .classed('container', true);

    this.textCounter = this.container.append("text")
     .attr('id','wow')
     .text('Infected Count: 1')
     .classed("textCounter", true);

    this.people.push(new p.Person(this.container, 10, 7, 'n1', 'red', Math.PI / 2, 5));
    this.people.push(new p.Person(this.container, 30, 14, 'n2', '#69b3a2', Math.PI / 3, 5));
    this.people.push(new p.Person(this.container, 40, 21, 'n3', '#69b3a2', Math.PI / 4, 5));
    this.people.push(new p.Person(this.container, 60, 28, 'n4', '#69b3a2', Math.PI / 5, 5));
    this.people.push(new p.Person(this.container, 80, 35, 'n5', '#69b3a2', Math.PI / 6, 5));
    this.people.push(new p.Person(this.container, 100, 42, 'n6', '#69b3a2', Math.PI / 7, 5));
    this.people.push(new p.Person(this.container, 120, 47, 'n7', '#69b3a2', Math.PI / 8, 5));
    this.people.push(new p.Person(this.container, 140, 54, 'n8', '#69b3a2', Math.PI / 9, 5));
    this.people.push(new p.Person(this.container, 150, 61, 'n9', '#69b3a2', Math.PI + Math.PI / 66, 5));
    this.people.push(new p.Person(this.container, 170, 68, 'n10', '#69b3a2', Math.PI + Math.PI / 77, 5));
    this.people.push(new p.Person(this.container, 190, 75, 'n11', '#69b3a2', Math.PI + Math.PI / 18, 5));
    this.people.push(new p.Person(this.container, 210, 82, 'n12', '#69b3a2', Math.PI + Math.PI / 23, 5));
    this.people.push(new p.Person(this.container, 240, 89, 'n13', '#69b3a2', Math.PI + Math.PI / 41, 5));
    this.people.push(new p.Person(this.container, 280, 96, 'n14', '#69b3a2', Math.PI + Math.PI / 123, 5));
    this.people.push(new p.Person(this.container, 300, 102, 'n15', '#69b3a2', Math.PI + Math.PI / 31, 5));
    this.people.push(new p.Person(this.container, 23, 109, 'n16', '#69b3a2', Math.PI + Math.PI / 44, 5));
    this.people.push(new p.Person(this.container, 40, 120, 'n17', '#69b3a2', Math.PI + Math.PI / 91, 5));
    for (let person of this.people){
      this.drawInital(person);
    }
    this.animate();
}

public createPeopleArray(value: number, currentWidth: number, currentHeight: number): void {
  for(let i; i < value; i++) {
    if(i == 1){
      console.log('push 1')
      this.people.push(new p.Person(this.container, 280, 280, 'n1', 'red', Math.PI / 2, value / 5));
    } else {
      console.log('push 1')
      this.people.push(new p.Person(this.container, currentWidth / 10 * i, currentHeight /10 * i, 'n' + i, '#69b3a2', Math.PI / 3, 5));
    }
  }
}

public enumerateObjectInstances(
    options: EnumerateVisualObjectInstancesOptions
  ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    );
  }

  public drawInital(svgObj: Person){
    let svg = svgObj.svg;
    let person = svg.selectAll('#' + svgObj.id)
    .data(svgObj.data);
    svgObj.infectStatus == true ? svgObj.color = 'red' : svgObj.color == 'pink';

    person.enter()
        .append("circle")
        .attr("id", svgObj.id)
        .attr("class", "ball")
        .attr('r', svgObj.radius)
        .attr('weight', svgObj.weight)
        .attr("cx", svgObj.posX)
        .attr("cy", svgObj.posY)
        .style("fill", svgObj.color);
  }

  public reset(){
      console.log('reset')
  }
  public update(options: VisualUpdateOptions) {
    this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
    let visualViewModel: CoronaVisualViewModel = visualTransform(options, this.host);
    this.svg.attr("width", options.viewport.width - 20);
    this.svg.attr("height", options.viewport.height - 20);
    this.container.attr("width", options.viewport.width - 20);
    this.container.attr("height", options.viewport.height - 20);
    this.textCounter.attr('x', 5).attr('y', options.viewport.height - 25)
    // console.log(visualViewModel)
  }

  public animate() {
    let people = this.people
    d3.timer(function (elapsed) {
        for (var i = 0; i < people.length; ++i) {
                let r = people[i].Move();
                for (let j = i + 1; j < people.length; ++j) {
                     p.ProcessCollision(i, j, people)
                  }
             }
         }, 500);
    }
  /**
   * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
   * objects and properties you want to expose to the users in the property pane.
   *
   */

  private static parseSettings(dataView: DataView): VisualSettings {
    return <VisualSettings>VisualSettings.parse(dataView);
  }

}
