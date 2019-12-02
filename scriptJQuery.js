/*
Name: Greg Lawrence
Email: gregory_lawrence@student.uml.edu
Umass Lowell Computer Science
Copyright(c) December 1, 2019. May be freely copied or excerpted for educational purposes with credit to the author.
*/

// function to get values entered by user when submit is clicked
// and then call functions to create multiplication table based
// on those numbers
function sub(){
    var num1, num2, num3, num4;
    var allNums = document.getElementsByClassName("inputNum");
    // set the input values to newly created variables and use parseInt to make sure they are used as integers
    lowerX = parseInt(allNums[0].value, 10);
    higherX = parseInt(allNums[1].value, 10);
    lowerY = parseInt(allNums[2].value, 10);
    higherY = parseInt(allNums[3].value, 10);

    createTable(lowerX, higherX, lowerY, higherY); // call function to actually create the table with the correct size for populating with numbers
    populateTable(lowerX, higherX, lowerY, higherY); // Call function to populate the table with the proper multiplied values
}

// Creates an empty table ready to be populated with numbers
function createTable(lx, hx, ly, hy){
    var table = $("<table></table>").attr("id", "multTable");
    var colLength = Math.abs(ly - hy) + 1;
    var rowLength = Math.abs(lx - hx) + 1;

    // This code should create a table with enough space to fit the input ranges
    // as well as the actual multiplied values
    for(i = 0; i <= colLength; i++){
        row = $("<tr></tr>");
        for(j = 0; j <= rowLength; j++){
            col = $("<td></td>");
            row.append(col);
        }
        table.append(row);
    }
    $("#mTContainer").empty();
    $("#mTContainer").append(table);
}

// Go through the created table and adds the title row and column, then adds the multiplied values
function populateTable(lx, hx, ly, hy){

    var rows = $("#multTable tr");
    var numOfRows = rows.length;

    // If user entered values out of order, just swap them so that the multiplication table goes from
    // the smaller value to the larger value
    if((hy - ly) < 0){
        [hy, ly] = [ly, hy];
    }
    if((hx - lx) < 0){
        [hx, lx] = [lx, hx];
    }

    // Populate the first row with the multiplier range
    $("#multTable tr:first-child td").each( function(index, elem){
        if(index != 0){
            $(elem).html(lx + index - 1);
            $(elem).css({
                "border-style" : "solid",
                "border-width" : "4px",
                "border-color" : "cyan",
                "background-color" : "black",
                "color" : "cyan",
                "padding" : "5px"
            });
        }else{
            $(elem).css({
                "border-style" : "solid",
                "border-width" : "4px",
                "border-color" : "cyan",
                "background-color" : "black",
                "color" : "cyan",
                "padding" : "5px"
            });
        }
    });

    // Go through the table, and add each of the values
    rows.each(function(rIndex, rVal){
        var cols = $(this).find("td");
        var numOfCols = cols.length;

        cols.each(function(cIndex, cVal){
            // Populate first column with the multiplicand range
            if(rIndex != 0 && cIndex == 0){
                $(this).html(ly + rIndex - 1);
                $(this).css({
                    "border-style" : "solid",
                    "border-width" : "4px",
                    "border-color" : "cyan",
                    "background-color" : "black",
                    "color" : "cyan",
                    "padding" : "5px"
                });
            }
            else if(rIndex != 0){
                var val = ($(rVal).find("td:first-child").html() * $(rows[0]).find("td:nth-child(" + (cIndex + 1) + ")").html());
                $(this).html(val);
            }
        });
    });

}
