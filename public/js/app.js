class TodoDashboard extends React.Component {
    state = {
        todoList: [],
        completedList: [],
        archivedList: [],
        backLogList: [],
        additional: 'closed'
    };

    componentDidMount() {
        this.loadTodosFromServer();
    };

    loadTodosFromServer = () => {
      client.getTodos((response) => {
          this.setState({
              todoList: response.todoList || [],
              completedList: response.completedList || [],
              archivedList: response.archivedList || [],
              backLogList: response.backLogList || []
          });
      });
    };

    editTask = (taskId, status) => {
        let newStatus = {}, listName = this.getListName(status);
        newStatus[listName] = this.updatePropsForTask(this.state[listName], taskId, {editing : true});
        this.setState(newStatus);
    };

    changeTaskTitle = (taskId, title, status) => {
        let newStatus = {}, listName = this.getListName(status);
        newStatus[listName] = this.updatePropsForTask(this.state[listName], taskId, {editing: false, title: title});
        client.updateTodo({
            id: taskId,
            title: title,
            listName: listName
        });
        this.setState(newStatus);
    };

    updatePropsForTask = (list, taskId, properties) => {
        let updatedList = list.map((task) => {
            if(task.id === taskId) {
                return Object.assign({}, task, properties);
            } else {
                return task;
            }
        });
        return updatedList;
    };

    addTaskToList = (list, task) => {
        return list.concat(task);
    };

    removeTaskFromList = (list, taskId) => {
        let updatedList = list.filter((task) => {
            if(task.id !== taskId) {
                return task;
            }
        });
        return updatedList;
    };

    addTodo = (status) => {
        const listName = this.getListName(status);
        const todo = {
            id: uuid.v4(),
            title: "",
            completedOn: null,
            editing: true,
            status: status,
            createdOn: Date.now(),
            listName: listName
        };
        const newState = {};
        newState[listName] = this.addTaskToList(this.state[listName], todo);
        client.createTodo(todo);
        this.setState(newState);
    };

    completeTask = (taskId) => {
        const task = Object.assign(
            {},
            this.getTaskForId(this.state.todoList, taskId),
            {status: "completed", editing: false, completedOn: Date.now()}
        );
        if(task.id) {
            const updatedLists = this.moveTask(this.state.todoList, this.state.completedList, task);
            client.moveTask({task: task, fromList: "todoList", toList: "completedList"});
            this.setState({
                todoList: updatedLists.fromList,
                completedList: updatedLists.toList
            });
        }
    };

    redoTask = (taskId) => {
        const task = Object.assign(
            {},
            this.getTaskForId(this.state.completedList, taskId),
            {status: "todo", editing: false, completedOn: null}
        );
        if(task.id) {
            const updatedLists = this.moveTask(this.state.completedList, this.state.todoList, task);
            client.moveTask({task: task, fromList: "completedList", toList: "todoList"});
            this.setState({
                todoList: updatedLists.toList,
                completedList: updatedLists.fromList
            });
        }
    };

    archiveTask = (taskId) => {
        const task = Object.assign(
            {},
            this.getTaskForId(this.state.completedList, taskId),
            {status: "archived", editing: false}
        );
        if(task.id) {
            const updatedLists = this.moveTask(this.state.completedList, this.state.archivedList, task);
            client.moveTask({task: task, fromList: "completedList", toList: "archivedList"});
            this.setState({
                completedList: updatedLists.fromList,
                archivedList: updatedLists.toList
            });
        }
    };

    startTask = (taskId) => {
        const task = Object.assign(
            {},
            this.getTaskForId(this.state.backLogList, taskId),
            {status: "todo"}
        );
        if(task.id) {
            const updatedLists = this.moveTask(this.state.backLogList, this.state.todoList, task);
            client.moveTask({task: task, fromList: "backLogList", toList: "todoList"});
            this.setState({
                todoList: updatedLists.toList,
                backLogList: updatedLists.fromList
            });
        }
    };

    deferTask = (taskId) => {
        const task = Object.assign(
            {},
            this.getTaskForId(this.state.todoList, taskId),
            {status: "backlog"}
        );
        if(task.id) {
            const updatedLists = this.moveTask(this.state.todoList, this.state.backLogList, task);
            client.moveTask({task: task, fromList: "todoList", toList: "backLogList"});
            this.setState({
                todoList: updatedLists.fromList,
                backLogList: updatedLists.toList
            });
        }
    };

    moveTask = (fromList, toList, task) => {
        if(task.id) {
            return {
                fromList : this.removeTaskFromList(fromList, task.id),
                toList: this.addTaskToList(toList, task)
            };
        } else {
            return {
                fromList: fromList,
                toList: toList
            };
        }
    };

    removeBacklogTask = (taskId) => {
        client.deleteTodos({id: taskId, listName: "backLogList"});
        this.setState({
            backLogList: this.removeTaskFromList(this.state.backLogList, taskId)
        });
    };

    removeArchivedTask = (taskId) => {
        client.deleteTodos({id: taskId, listName: "archivedList"});
        this.setState({
            archivedList: this.removeTaskFromList(this.state.archivedList, taskId)
        });
    };

    removeTodo = (taskId) => {
        client.deleteTodos({id: taskId, listName: "todoList"});
        this.setState({
            todoList: this.removeTaskFromList(this.state.todoList, taskId)
        });
    };

    getTaskForId = (list, taskId) => {
        return list.find((task) => (task.id === taskId));
    };

    getListName = (status) => {
        if(status === "todo") {
            return "todoList"
        } else {
            return "backLogList"
        }
    };

    toggleAdditional = (e) => {
        const newState = this.state.additional === 'open' ? 'closed' : 'open';
        this.setState({
            additional: newState
        });
    };

    render() {
        return (
            <div id="todos-dashborad">
                <div className="ui horizontal segments">
                    <div className="ui segment blue listSegment">
                        <TodoList
                            tasks={this.state.todoList}
                            editTask={this.editTask}
                            changeTaskTitle={this.changeTaskTitle}
                            addTodo={this.addTodo}
                            completeTask={this.completeTask}
                            removeTask={this.removeTodo}
                            deferTask={this.deferTask}
                        />
                    </div>

                    <div className="ui segment green listSegment">
                        <CompletedList
                            tasks={this.state.completedList}
                            redoTask={this.redoTask}
                            archiveTask={this.archiveTask}
                        />
                    </div>
                </div>
                <button
                    className={"ui basic blue button toggleAdditional " + this.state.additional}
                    onClick={this.toggleAdditional}
                >
                    <span className="seeMore">
                        See More
                        <i className="icon caret left"></i>
                    </span>
                    <span className="seeLess">
                        See Less
                        <i className="icon caret down"></i>
                    </span>
                </button>
                <div className={"ui horizontal segments additional " + this.state.additional}>
                    <div className="ui segment orange listSegment">
                        <BackLogList
                            tasks={this.state.backLogList}
                            editTask={this.editTask}
                            changeTaskTitle={this.changeTaskTitle}
                            startTask={this.startTask}
                            removeTask={this.removeBacklogTask}
                            addTodo={this.addTodo}
                        />
                    </div>

                    <div className="ui segment olive listSegment">
                        <ArchivedList
                            tasks={this.state.archivedList}
                            removeTask={this.removeArchivedTask}
                        />
                    </div>
                </div>

            </div>
        );
    };
}

ReactDOM.render(<TodoDashboard />, document.getElementById('content'));