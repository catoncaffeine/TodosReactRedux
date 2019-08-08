class CompletedList extends React.Component {
    handleRedoTask = (taskId) => {
        this.props.redoTask(taskId);
    };

    handleArchiveTask = (taskId) => {
        this.props.archiveTask(taskId);
    };

    render() {
        const actions = [
            {color: "blue", icon: "undo", order: 0, handler: this.handleRedoTask},
            {color: "olive", icon: "archive", order: 1, handler: this.handleArchiveTask}
        ];
        return (
            <div id="completed-list">
                <TaskList
                    category="completed"
                    listName="Completed"
                    tasks={this.props.tasks}
                    actions={actions}
                />
            </div>
        );
    };
}