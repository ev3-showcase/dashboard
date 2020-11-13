import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { scaleLinear } from 'd3';

@Component({
  selector: 'app-connected-scatter-plot',
  templateUrl: './app-connected-scatter-plot.component.html',
  styleUrls: ['./app-connected-scatter-plot.component.scss'],
})
export class ConnectedScatterPlotComponent implements AfterViewInit, OnChanges {
  @Input()
  points: any[];
  svg = null;
  width = 500;
  height = 500;
  radius = Math.min(this.width, this.height) / 2 - 30;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.svg) {
      this.updateGraph();
    }
  }

  ngAfterViewInit(): void {
    this.initGraph();
  }

  initGraph() {
    var r = scaleLinear().domain([0, 1]).range([0, this.radius]);
    var line = d3
      .lineRadial()
      .radius(function (d) {
        return r(d[1]);
      })
      .angle(function (d) {
        return -d[0] + Math.PI / 2;
      });
    this.svg = d3
      .select('#test')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
    var gr = this.svg
      .append('g')
      .attr('class', 'r axis')
      .selectAll('g')
      .data(r.ticks(3).slice(1))
      .enter()
      .append('g');
    gr.append('circle')
      .attr('r', r)
      .style('stroke', 'blue')
      .style('fill', 'none');
    var ga = this.svg
      .append('g')
      .attr('class', 'a axis')
      .selectAll('g')
      .data(d3.range(0, 360, 30))
      .enter()
      .append('g')
      .attr('transform', function (d) {
        return 'rotate(' + -d + ')';
      })
      .style('stroke', 'blue')
      .style('fill', 'none');
    ga.append('line').attr('x2', this.radius);
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var line = d3
      .lineRadial()
      .radius(function (d) {
        return r(d[1]);
      })
      .angle(function (d) {
        return -d[0] + Math.PI / 2;
      });
  }

  updateGraph() {
    this.svg.selectAll('point').remove();
    var r = scaleLinear().domain([0, 1]).range([0, this.radius]);

    this.svg
      .selectAll('point')
      .data(this.points)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('transform', function (d) {
        // get angle and radius
        var an = d[0];
        var ra = r(d[1]);
        var x = ra * Math.cos(an);
        var y = ra * Math.sin(an);
        return 'translate(' + [x, y] + ')';
      })
      .attr('r', 2)
      .attr('fill', 'black');
  }
}
