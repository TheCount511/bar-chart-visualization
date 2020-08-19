const dataset=[40, 50, 34, 78, 89, 45, 67, 89, 23, 56, 389, 58, 56, 23,]

/*let date;
let value

    d3.select("body").selectAll("div")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style("height", (d)=>`${d}px`)*/

let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

let fetchJson=( url)=>{
	let date;
	let time;
	fetch(url)
	.then(response=> response.json() )
	.then((response) => {
		let data = response.data
		return data.map(item => {
			return item[1]
		})

}).then(value => {
 
 d3.select("body").selectAll("div")
      .data(value)
      .enter()
      .append("div")
      .attr("class", "bar")
      .style("height", (d)=>`${d/2}px`)
});

}

fetchJson(url);