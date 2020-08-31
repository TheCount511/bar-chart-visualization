
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const canvasWidth = 800;
const canvasHeight = 600;
const barWidth = canvasWidth/275;
const padding = 60;


const formatYears = (dateInput)=>{
	return Number(dateInput.substring(0,4));
}

const formatTooltip=(dateInput, amountInput)=>
{
year = formatYears(dateInput)
const quarterVal = Number(dateInput.substring(5,7));
let quarter = (v)=>{
	let q;
	switch (quarterVal)
	{
	case 1: return  q = "Q1"; break;
	case 4: return q= "Q2"; break;
	case 7: return q = "Q3"; break;
	case 10: return q= "Q4"; break;
	default: return q= "INVALID quarter";
	}

	return q
}

return `${year} ${quarter(quarterVal)} \n $${amountInput.toLocaleString()} BILLION`;

}

const fetchJson=( url)=>{
	fetch(url)
	.then(response=> response.json() )
	.then((response) => {
		const data = response.data
		const values= data.map(item => {
			return item[1]	
		});
		const dates = data.map(item => {
			return item[0]	
		});
		const fullDates = dates.map(item=>{
			return new Date(item)
		})
		const chartArray = values.map((item,index)=>
		{
 		 return [ fullDates[index], item, formatTooltip(dates[index], item)]
			})


			return chartArray
			})

.then(value => {

const gpdMax = d3.max(value, (d)=> d[1]);
const minDate = d3.min(value, (d)=> d[0]);
const maxDate = d3.max(value, (d)=> d[0]);

const xScale =  d3.scaleTime()
.domain([minDate, maxDate])
.range([padding, canvasWidth-padding]);

const yScale = d3.scaleLinear()
.domain([0, gpdMax])
.range([canvasHeight-padding, padding]);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

const svg = d3.select("body")
 	.append("svg")
 	.attr("width", canvasWidth)
 	.attr("height", canvasHeight);
 
 var tooltip = d3.select("body").append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

var overlay = d3.select('body').append('div')
  .attr('class', 'overlay')
  .style('opacity', 0);

 const mouseover = (d,i) =>{
         overlay.transition()
        .duration(0)
        .style('height', canvasHeight - padding -  yScale(d[1]) + 'px')
        .style('width', barWidth + 'px')
        .style('opacity', .9)
        .style('left', (i * barWidth) + 0 + 'px')
        .style('top', canvasHeight - padding -  yScale(d[1]) + 'px')
        .style('transform', 'translateX(60px)');
      tooltip.transition()
        .duration(200)
        .style('opacity', .9);
             tooltip.html(d[2])
        .style('left', (i * barWidth) + 0 + 'px')
        .style('top', canvasHeight - 100 + 'px')
        .style('transform', 'translateX(60px)'); 
 }
	 
 svg.selectAll("rect")
  .data(value)
  .enter()
  .append("rect")
  .attr("x", (d)=> xScale(d[0]))
  .attr("y", (d)=>  yScale(d[1]))
  .attr("width", (d) => barWidth )
  .attr("height", (d) => canvasHeight - padding -  yScale(d[1]))
  .attr("class", "bar")
  .on("mouseover", mouseover);

  svg.append("g")
  .attr("transform", `translate(0, ${canvasHeight-padding})`)
  .call(xAxis)

  svg.append("g")
  .attr("transform", `translate(${padding}, 0)`)
  .call(yAxis);

  });

}

fetchJson(url);
