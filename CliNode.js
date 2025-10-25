const { assert } = require("console");
const fs = require("fs");
const path = './CharlyData.json';

const readline = require('readline');
const prompts = readline.createInterface(process.stdin, process.stdout);


if (!fs.existsSync(path)) {
  fs.writeFileSync(path, JSON.stringify([]), 'utf8');
}

let data = JSON.parse(fs.readFileSync(path, 'utf8'));
let last = (data.length > 0) ? data[data.length-1].id : -1


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

function addTask(des){
    last += 1;
    data.push({"id": last, "description": des, "status": "todo",
         "createdAt": Date.now(), "updatedAt": Date.now()});
    console.log("Added: " + des)
    fs.writeFileSync(path, JSON.stringify(data), 'utf8');
}


function deleteTask(id) {
    data = data.filter(e => e.id != id);
    fs.writeFileSync(path, JSON.stringify(data), 'utf8');
}


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

function mark(id, as){
    data = data.map(e => (e.id != id) ? e : {...e, "status":as})
    fs.writeFileSync(path, JSON.stringify(data), 'utf8');
}

function ask (){
    prompts.question("task-cli> ", (res) =>{
        let tokens = res.split(" ");
        if (tokens.length < 1) ask()
        switch (tokens[0]){
            case "delete":
                if (tokens.length < 2){ console.log("No id provided"); ask();}
                if (Number(tokens[1]) == NaN) console.log("No valid id provided"); ask();
                deleteTask(Number(tokens[1]));
                break;
            case "add":
                if (tokens.length < 2){ console.log("No description provided"); ask();}
                addTask(tokens.slice(1).join(" "));
                break;
            case "update":
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
                if (tokens.length < 2){ console.log("No id provided"); ask();}
                if (Number(tokens[1]) == NaN) console.log("No valid id provided"); ask();
                mark(tokens[1], "in-progress")
                break;
            case "mark-done":
                if (tokens.length < 2){ console.log("No id provided"); ask();}
                if (Number(tokens[1]) == NaN) console.log("No valid id provided"); ask();
                mark(tokens[1], "done")
                break;
            default:
                console.log("Invalid command");
        }
        ask()
    })
    
}

ask()


