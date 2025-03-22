import * as d3 from "d3";


export let drawScatterPlot = (scatterPlotLayer, data, xScale, yScale, tooltip, scatterPlotWidth, scatterPlotHeight) => {

    scatterPlotLayer.selectAll('.point') //select all the circle elements with the class 'point'
        .data(data) //bind the data to the circle elements
        .enter() //create placeholder for each data point
        .append('circle') //append a circle element for each data point
        .attr('class', d=>`point ${d.station.replace(/[^a-zA-Z]/g, "")}`) //set the class names of the circle element to 'point' and the station name
        .attr('cx', d => xScale(d.tripdurationS))
        .attr('cy', d => yScale(d.tripdurationE))
        .attr('r', "5")
        .style("fill", 'steelblue')
        .style("stroke", "black")
        .style("stroke-width", 2)
        .on("mouseover", (event, d) => {
            const point = d3.select(event.currentTarget);
            point.raise();
            point.transition()
                .duration(500)
                .attr('r', 10)
                .style("fill", 'red');

            // Task 8 Part 1: 高亮柱状图中对应的柱子
            const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
            const bar = d3.selectAll(`.bar.${stationClass}`);
            bar.raise();
            bar.transition()
                .duration(200)
                .style('fill', 'red');

            tooltip.style("opacity", 0.9)
                .html(d.start_station)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");

            scatterPlotLayer.append("rect")
                .attr("class", "highlight-rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", scatterPlotWidth)
                .attr("height", scatterPlotHeight)
                .style("fill", "yellow")
                .style("opacity", 0.5)
                .style("pointer-events", "none")
                .lower();
        })
        .on('mouseout', (event, d) => {
            const point = d3.select(event.currentTarget);
            point.transition()
                .duration(500)
                .attr('r', 5)
                .style("fill", 'steelblue');

            // Task 8 Part 1: 恢复柱状图中柱子的样式
            const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
            d3.selectAll(`.bar.${stationClass}`)
                .transition()
                .duration(200)
                .style('fill', 'steelblue');

            tooltip.html("")
                .style("opacity", 0);

            scatterPlotLayer.select(".highlight-rect").remove();
        });

}