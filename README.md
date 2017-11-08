# SimpleTodo

SimpleTodo is a web app for making todo lists on. It makes use of browser storage with no server necessary. Just run the index.htm file and you're good.

## Screenshot
A picture is worth 1000 words:


![Screenshot](https://user-images.githubusercontent.com/6578915/32556398-3bea1fc0-c497-11e7-8cbc-9565aec40a81.png)

## Features
- Due dates on task, will flash when overdue
- JIRA ticket links, simply set your JIRA prefix and ticket IDs can be placed next to tasks
- Single-depth (for now) subtasks
- Task rearranging
- Multiple states: TODO, WORK, HOLD, DONE
- Colour coding
- Task comments and editing

## Usage
Run the application by opening the index.htm in your favourite web browser.
- Up and down arrows or `j` and `k` go up and down. 
- `a` adds a task, `s` adds a subtask
- `c` adds a comment, `e` edits an existing task
- `d` changes status between TODO, WORK, HOLD, or DONE
- `t` sets a due time
  - Natural language dates and times i.e. '2 hours from now', 'tomorrow 2pm' are supported!
- `l` adds a JIRA link, simply type a ticket ID and if the URL is set, a link will appear next to the task
- `[` and `]` move the task up or down respectively
- `x` deletes a task
