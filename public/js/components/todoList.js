class TodoList extends React.Component {
    handleCompleteTask = (taskId) => {
        this.props.completeTask(taskId);
    };

    handleDeleteTask = (taskId) => {
        this.props.removeTask(taskId);
    };

    handleDeferTask = (taskId) => {
        this.props.deferTask(taskId);
    };

    handleAddTodo = () => {
        this.props.addTodo("todo");
    };

    render() {
        const actions = [
            {color: "green", icon: "check", order: 0, handler: this.handleCompleteTask},
            {color: "orange", icon: "download", order: 1, handler: this.handleDeferTask},
            {color: "red", icon: "trash", order: 2, handler: this.handleDeleteTask}
        ];
        return (
            <div id="todo-list">
                <button
                    className="ui button mini compact icon basic addButton"
                    onClick={this.handleAddTodo}
                >
                    <i className="plus icon large"></i>
                </button>
                <TaskList
                    category="todo"
                    listName="To Do"
                    tasks={this.props.tasks}
                    editTask={this.props.editTask}
                    changeTaskTitle={this.props.changeTaskTitle}
                    actions={actions}
                />
            </div>
        );
    };
}