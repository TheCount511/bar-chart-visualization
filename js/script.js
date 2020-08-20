
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const formatTooltip=(dateInput, amountInput)=>
{

const year = dateInput.substring(0,4);
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

return `${year} ${quarter(quarterVal)} \n $${amountInput} BILLION`;
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
		let labels = [];
(() => {
		
values.map((item,index)=>{

	labels.push(formatTooltip(dates[index], item))
})
})();
console.log(labels);

		return ([values, dates, labels])

}).then(value => {
  let Y;

 const svg = d3.select("body")
 	.append("svg")
 	.attr("width", 800)
 	.attr("height", 800);
 		svg.selectAll("rect")
      .data(value[0])
      .enter()
      .append("rect")
      .attr("x", (val, index)=> index*3)
      .attr("y", (d)=>800- d/25)
      .attr("width", `${2}px`)
      .attr("height", (d) => d/25 )
      .attr("class", "bar")
      .append("title");

      svg.selectAll("text")
      .data(value[1])
      .enter()
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .text((d)=> d)
      
});

}

fetchJson(url);