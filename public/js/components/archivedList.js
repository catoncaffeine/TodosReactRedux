class ArchivedList extends React.Component {
    handleDeleteTask = (taskId) => {
        this.props.removeTask(taskId);
    };

    render() {
        const actions = [
            {color: "red", icon: "trash", order: 1, handler: this.handleDeleteTask}
        ];
        return (
            <div id="archived-list">
                <TaskList
                    category="archived"
                    listName="Archived"
                    tasks={this.props.tasks}
                    actions={actions}
                />
            </div>
        );
    };
}