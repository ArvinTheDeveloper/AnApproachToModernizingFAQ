$( document ).ready(function() {

    // Todo: Fetch data from Questions.txt and Answers.txt, parse and craete a table with questions
    // Todo: When users clicks on a question, the answer should show below the question as a dropdown (use .hide(100) and .show(100)). Add a listener for each question
    // Todo: When users click on another question, all the answers that are visible should become hidden before displaying the answer to the next clicked question
    
    
    function fetchDataFromFile(path){
        var text = "";

        return text;

    }

    function appendRow(table, question, answer) {
        var row = table.insertRow(table.rows.length);
        row.className = "attachment-row";

        //id of attachment in hidden form
        var idInDiv = document.createElement('DIV');
        $(idInDiv).addClass("hide");idInDiv.appendChild(document.createTextNode(attachment.AttachmentId));

        //preview button (span)
        var preview = document.createElement('SPAN');
        preview.title = "Förhandsvisa";
        $(preview).addClass("file-name");preview.appendChild(document.createTextNode(attachment.FileName));

        //checkbox
        var checkbox = document.createElement("INPUT"); checkbox.setAttribute("type", "checkbox");
        $(checkbox).addClass("pointify");

        //size in kb column
        var size = document.createElement('DIV');
        $(size).addClass("file-size");
        size.appendChild(document.createTextNode(attachment.FileSize / 1024));

        this.createCell(row.insertCell(0), checkbox);
        this.createCell(row.insertCell(1), preview);
        this.createCell(row.insertCell(2), size);
        this.createCell(row.insertCell(3), idInDiv);
    }
    function createCell(cell, content) {
        cell.appendChild(content);
    }

    function handleFiles(input) {
        var inputQuestions = $("#input-questions");
        var inputAnswers = $("input-answers");
        

        if (inputQuestions.target.files[0] && inputAnswers.target.files[0]) {
            const questions = inputQuestions.target.files[0];
            const answers = inputAnswers.target.files[0];
        }
        const file = input.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const file = event.target.result;
            const allLines = file.split(/\r\n|\n/);
            // Reading line by line
            allLines.forEach((line) => {
                console.log(line);
            });
        };
    
        reader.onerror = (event) => {
            alert(event.target.error.name);
        };
    
        reader.readAsText(file);
    }

    
    /**
     * parseFile: Takes input elememt with type "file". Parses it and returns an array object where an object contains question, answer and number.
     */
    function parseFile(input){

        console.log("arvin: ParseFile: input.target.files[0]: " + input.files[0] + "input.files[0]: " + input.files[0]);

        if (!input || !input.files[0])
            return null;

        const file = input.files[0];
        const reader = new FileReader();
        var arrQA = [];
        var regex = /\d*?(?=\.)/;

        reader.onload = (event) => {
            const file = event.target.result;
            const allLines = file.split(/\r\n|\n/);
            // Reading line by line
            for(var i = 0; i < allLines.length; i++){
                arrQA.push({
                    question: allLines[i],
                    answer: allLines[i+1],
                    number: allLines[i].match(regex)
                });
            }
        };
    
        reader.onerror = (event) => {
            alert(event.target.error.name);
        };
    
        reader.readAsText(file);
        
        if(arrQA.length < 0)
            return arrQA;
    }

    //Parse File 
    function handleFileSelect(event){
        if(!(event.target && event.target.files && event.target.files[0])){
            return;
        }

        //Handle the csv file
        var csvFile = event.target.files[0];

        Papa.parse(csvFile, {
            header: true,
            dynamicTyping: true,
            delimiter:";",
            complete: function(results){
                var data = results.data;

                //Call is async. needs callback in order to work with items
                handleDataset(results);
            }
        });


    }

    function handleDataset(dataset) {
        //Converts parsed CSV file
        var arrayQnA = [];
        for(var i = 0; i < dataset.data.length; i++)
        {
            arrayQnA[i] = dataset.data[i];
        }

        console.log("Chris: Nr of elements in array = " + arrayQnA.length);
        //Function for creating and appenidng rows to JS.

        arrayQnA.forEach(element => {
            
            console.log("Chris log: ", element.Id);

            //Create and append rows in table

        });

        //could replace arrayQnA with dataset...    
       /* for (let item of arrayQnA) {
            row = table.insertRow(-1);
            for (let key in item) {
                var cell = row.insertCell(-1);
                cell.innerHTML = item[key];
            }
        }*/
        /*
        for (let item of arrayQnA) {
            for (let key in item) {
                
                //var table = document.createElement("table");

                $("#myTable tbody").append(item[key]);

            }
        }*/

        
    }

    /**
     * addListeners: Sets listeners to elements of index.html
     */
    function addListeners(){
        console.log("arvin: Entered addlistneres()");

        $("#input-questions").change(handleFileSelect);
        /*
        $("#input-questions").change(function () {
            var inputQuestions = $("#input-questions");
            if (inputQuestions == null)
                return;
            
            console.log("arvin:inputQuestions.files[0]: " + inputQuestions[0].files[0]);

            parseFile(inputQuestions[0]);
        });*/

    }addListeners();
});
/*
<script> 
// Requiring fs module in which 
// readFile function is defined. 
const fs = require('fs') 

// Reading data in utf-8 format 
// which is a type of character set. 
// Instead of 'utf-8' it can be 
// other character set also like 'ascii' 
fs.readFile('Input.txt', 'utf-8', (err, data) => { 
	if (err) throw err; 

	// Converting Raw Buffer to text 
	// data using tostring function. 
	console.log(data); 
}) 
</script> */
