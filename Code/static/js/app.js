//define global variables
var sampleValues;
var otuIds;
var otuLabels;
var otuPersonId;
function init(){
    //initializes default graph
    //read data from samples.json
    var filepath="../../samples.json";
    var dataPromise= d3.json(filepath).then(data => {
        //get the values for the first otu_id
        sampleValues= data.samples.map(sample => sample.sample_values);
        otuIds= data.samples.map(sample => sample.otu_ids);
        otuLabels= data.samples.map(sample => sample.otu_labels);
        otuPersonId= data.samples.map(sample => sample.id);
        //create data for Bar char plotly
        var data=[{
            x: sampleValues[0],
            y: otuIds[0].map(sample => "OTU ".concat(sample)), //add str OTU before each OTU_id
            type: "bar",
            orientation: "h", //horizontal bar
            text: otuLabels[0] //hovertext
        }];
        var layout={ title: "Belly Bacteria population"};
        //plot graph
        Plotly.newPlot("bar", data, layout);
        //select dropdown menu 
        var dropDown= d3.select("#selDataset")
        //give the dropdow id values
        otuPersonId.forEach(element => {
            dropDown.append("option").text("PersonId: ".concat(element));
        });
        //create data for bubble chart
        var data=[{
            x: otuIds[0], //Use `otu_ids` for the x values.
            y: sampleValues[0], //Use `sample_values` for the y values.
            mode: "markers",
            marker:{
                size: sampleValues[0], //Use `sample_values` for the marker size.
                color: otuIds[0] //Use `otu_ids` for the marker colors.
            },
            text: otuLabels[0] //Use `otu_labels` for the text values
        }];
        var layout={ title: "Belly Bacteria Population",
            xaxis:{title: "OTU ID"},
            yaxis:{title: "Values"}
        };
        //Plot intial Bubble chart
        Plotly.newPlot("bubble", data, layout); 
        
    });
    
    
}

init();
//select dropdown and add event that updates the bar graph
d3.select("#selDataset").on("change", function(){
    var i= this.selectedIndex;
    //update bar chart
    var x= sampleValues[i];
    var y= otuIds[i].map(sample => "OTU ".concat(sample));
    var text= otuLabels[i];
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", [text]);
    //update bubble chart
    x= otuIds[i];
    y= sampleValues[i];
    var size= sampleValues[i];
    var color= otuIds[i];
    text= otuLabels[i];
    Plotly.restyle("bubble", "x", [x]);
    Plotly.restyle("bubble", "y", [y]);
    Plotly.restyle("bubble", "size", [size]);
    Plotly.restyle("bubble", "color", [color]);
    Plotly.restyle("bubble", "text", [text]);
});

