
import * as d3 from "d3";

export let drawBarChart = (barChatLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function
    barChatLayer.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)
        .attr('x', d => xScale(d.station))
        .attr('y', d => yScale(d.start))
        .attr('width', xScale.bandwidth())
        .attr('height', d => barChartHeight - yScale(d.start))
        .style('fill', 'steelblue')
        .style('stroke', 'black')
        .style('stroke-width', 1)
    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot
    .on('mouseover', (event, d) => {
        const bar = d3.select(event.currentTarget);
        bar.raise();
        bar.transition()
            .duration(200)
            .style('fill', 'red');

        const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
        const points = d3.selectAll(`.point.${stationClass}`);
        points.raise();
        points.transition()
            .duration(200)
            .attr('r', 10)
            .style('fill', 'red');

        const scatterPlotLayer = d3.select("#scatter-plot");
        scatterPlotLayer.append("rect")
            .attr("class", "highlight-rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 545) // scatterPlotWidth = innerWidth
            .attr("height", 360) // scatterPlotHeight = innerHeightScatter
            .style("fill", "yellow")
            .style("opacity", 0.5)
            .style("pointer-events", "none")
            .lower();
    })
        .on('mouseout', (event, d) => {
            const bar = d3.select(event.currentTarget);
            bar.transition()
                .duration(200)
                .style('fill', 'steelblue');

            const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
            d3.selectAll(`.point.${stationClass}`)
                .transition()
                .duration(200)
                .attr('r', 5)
                .style('fill', 'steelblue');
            const scatterPlotLayer = d3.select("#scatter-plot")
            scatterPlotLayer.select(".highlight-rect").remove();
        });
}