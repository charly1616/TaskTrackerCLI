
PROJECT URL: https://roadmap.sh/projects/task-tracker

# 🧰 Task CLI

A simple **command-line task manager** written in **Node.js**.  
You can add, update, delete, and list tasks — all stored in a local JSON file.  

---

## 🚀 Features
- Add new tasks  
- Update or delete existing tasks  
- Mark tasks as **todo**, **in-progress**, or **done**  
- List all tasks or filter by status  
- Data saved locally in `CharlyData.json`  
- Automatically creates the JSON file if it doesn't exist  

---

## 🛠️ Requirements
- Node.js (v14 or higher)
- No external libraries required

---

## 📦 Installation
1. Clone or download this project.
2. Make sure the file is named `task-cli.js` (or similar).
3. Open a terminal in the same directory.
4. Run:
   ```bash
   node task-cli.js
   ```

You’ll see a prompt like:
```
task-cli>
```

---

## 💡 Usage

Type commands directly after `task-cli>` in the terminal.

### ➕ Add a new task
```
add "Buy groceries"
```
Output:
```
Added: "Buy groceries"
```

---

### ✏️ Update a task
```
update 0 "Buy groceries and cook dinner"
```
If the ID exists, the task will be updated.  
If not, you’ll see `No task updated`.

---

### ❌ Delete a task
```
delete 1
```
Deletes the task with the given ID.

---

### 🚧 Mark a task as in-progress
```
mark-in-progress 2
```

### ✅ Mark a task as done
```
mark-done 0
```

---

### 📋 List all tasks
```
list
```

### 📋 List tasks by status
```
list todo
list done
list in-progress
```

---

## 🧠 Example session
```
task-cli> add "Buy groceries"
Added: "Buy groceries"

task-cli> add "Finish homework"
Added: "Finish homework"

task-cli> mark-in-progress 1
task-cli> mark-done 0

task-cli> list done
==== Tasks ====
0: "Buy groceries" done [Created: 1761379037019, Updated: 1761379037019]
```

---

## 💾 Data Storage
All tasks are stored in a JSON file named `CharlyData.json` in the same folder.  
The file is created automatically the first time you run the program.

---

## ⚙️ Error Handling
- Shows `Invalid command` if a command is not recognized.
- Warns if required arguments (like ID or description) are missing.
- Gracefully skips invalid IDs without crashing.

---

## 🧩 Notes
- IDs start from `0` and increase sequentially.
- Timestamps are stored in milliseconds (`Date.now()` format).
- The CLI continuously runs — press `Ctrl + C` to exit.

---

## 👨‍💻 Author
**Charlie**  
Simple, local, and dependency-free task management from the command line.
````
