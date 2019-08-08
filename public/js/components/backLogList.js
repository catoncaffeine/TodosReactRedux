class BackLogList extends React.Component {
    handleStartTask = (taskId) => {
        this.props.startTask(taskId);
    };

    handleDeleteTask = (taskId) => {
        this.props.removeTask(taskId);
    };

    handleAddTodo = () => {
        this.props.addTodo("backlog");
    };

    render() {
        const actions = [
            {color: "blue", icon: "upload", order: 0, handler: this.handleStartTask},
            {color: "red", icon: "trash", order: 1, handler: this.handleDeleteTask}
        ];
        return (
            <div id="back-log-list">
                <button
                    className="ui button compact icon mini basic addButton"
                    onClick={this.handleAddTodo}
                >
                    <i className="plus icon large"></i>
                </button>
                <TaskList
                    category="backlog"
                    listName="Back Log"
                    editTask={this.props.editTask}
                    changeTaskTitle={this.props.changeTaskTitle}
                    tasks={this.props.tasks}
                    actions={actions}
                />
            </div>
        );
    };
}