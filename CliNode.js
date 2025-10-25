const { assert } = require("console");
const fs = require("fs");
const path = './CharlyData.json';

const readline = require('readline');
const prompts = readline.createInterface(process.stdin, process.stdout);

//If doesnt exist, creates one Array json
if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([]), 'utf8');
}


//Gets the data and the last ID
let data = JSON.parse(fs.readFileSync(path, 'utf8'));
let last = (data.length > 0) ? data[data.length-1].id : -1



//This shows all the tasks with the status
function showAllTasks(sta){
    console.log("==== Tasks ====")
    let c = 0;
    data.forEach(e => {
        if (sta !== "" && e.status != sta) return;
        c++;
        console.log(e.id + ": " + e.description + " " + e.status + " [Created: " + e.createdAt + ", Updated: " + e.updatedAt + "]");
    });
    console.log((c == 0) ? "No task found" : "");
}


//Adds a task with a description
function addTask(des){
    last += 1;
    data.push({"id": last, "description": des, "status": "todo",
         "createdAt": Date.now(), "updatedAt": Date.now()});
    console.log("Added: " + des)
    fs.writeFileSync(path, JSON.stringify(data), 'utf8');
}


//Uses the id to delete a task
function deleteTask(id) {
    data = data.filter(e => e.id != id);
    fs.writeFileSync(path, JSON.stringify(data), 'utf8');
}


//This is for updating an existing task description, if not 
function updateTask(id, des){
    let c = 0;
    data = data.map(e =>{
        if (e.id != id){
            return e
        } else {
            c++;
            return {...e, "description": des, "updatedAt": Date.now()}
        }
    })
    fs.writeFileSync(path, JSON.stringify(data), 'utf8');
    if (!c) console.log("No task updated")
}



//This is used for marking an existing task as "Status"
function mark(id, as){
    data = data.map(e => (e.id != id) ? e : {...e, "status":as})
    fs.writeFileSync(path, JSON.stringify(data), 'utf8');
}

function ask (){
    prompts.question("task-cli> ", (res) =>{
        //Split all the tokens
        let tokens = res.split(" ");
        //If the message is empty, waits for another answer
        if (tokens.length < 1) ask()
        switch (tokens[0]){
            case "delete":
                //Token length must be 2 and second token must be a number
                if (tokens.length < 2){ console.log("No id provided"); ask();}
                if (Number(tokens[1]) == NaN) console.log("No valid id provided"); ask();
                deleteTask(Number(tokens[1]));
                break;
            case "add":
                //Must have a description
                if (tokens.length < 2){ console.log("No description provided"); ask();}
                addTask(tokens.slice(1).join(" "));
                break;
            case "update":
                //Token length must be 3 and second token must be a number
                if (tokens.length < 3){ console.log("No data provided"); ask();}
                if (Number(tokens[1]) == NaN) console.log("No valid id provided"); ask();
                updateTask(tokens[1], tokens[2]);
                break;
            case "list":
                if (tokens.length == 1){
                    showAllTasks("")
                } else {
                    showAllTasks(tokens[1])
                }
                break;
            case "mark-in-progress":
                //Token length must be 2 and second token must be a number
                if (tokens.length < 2){ console.log("No id provided"); ask();}
                if (Number(tokens[1]) == NaN) console.log("No valid id provided"); ask();
                mark(tokens[1], "in-progress")
                break;
            case "mark-done":
                //Token length must be 2 and second token must be a number
                if (tokens.length < 2){ console.log("No id provided"); ask();}
                if (Number(tokens[1]) == NaN) console.log("No valid id provided"); ask();
                mark(tokens[1], "done")
                break;
            default:
                //Default case
                console.log("Invalid command");
        }
        //When the request is processed correctly, starts waiting again
        ask()
    })
    
}

ask()


