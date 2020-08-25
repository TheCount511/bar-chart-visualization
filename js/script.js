
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const canvasWidth = 1230;
const canvasHeight = 830;


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

const chartArray = values.map((item,index)=>{
 return [ fullDates[index], item, formatTooltip(dates[index], item)]
})


return chartArray

}).then(value => {

/*const tooltip = d3.select("body")
			.append("div") 
    		.attr("class", "tooltip")               
    		.style("display", "block");
    .on("mouseover", function(d) {
      tooltip.html("d[2]")
     .style('top', d3.event.canvasHeight - 12 + 'px')
     .style('left', d3.event.canvasWidth + 25 + 'px')
     .style("display", "block")
      })
	.on("mouseout", function(d) {
    tooltip.style("display", "none");
});*/
const padding = 30;
const xScale =  d3.scaleLinear()
.domain([
	d3.min(value, (d)=> d[0]), 
	d3.max(value, (d)=> d[0].setMonth(d[0].getMonth() + 3))
	 ])
.range([padding, canvasWidth-padding]);

const yScale = d3.scaleLinear()
.domain([
	0, 
	d3.max(value, (d)=> d[1])
	])
.range([canvasHeight-padding, padding]);

const svg = d3.select("body")
 	.append("svg")
 	.attr("width", canvasWidth)
 	.attr("height", canvasHeight);
 	
 svg.selectAll("rect")
  .data(value)
  .enter()
  .append("rect")
  .attr("x", (d)=> xScale(d[0]))
  .attr("y", (d)=> yScale(d[1]))
  .attr("width", (d)=> 2)
  .attr("height", (d) => canvasHeight- yScale(d[1]))
  .attr("class", "bar");

 /* svg.selectAll("text")
  .data(value)
  .enter()
  .append("text")
  .attr("x", 0)
  .attr("y", 100)
  .text((d)=> d) 
*/


  });

}

fetchJson(url);