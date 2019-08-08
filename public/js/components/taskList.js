class TaskList extends React.Component {
    render() {
        const taskList = this.props.tasks.map((task) => {
            const taskProps = Object.assign({}, task, {
                key: task.id,
                editTask: this.props.editTask,
                changeTaskTitle: this.props.changeTaskTitle,
                actions: this.props.actions
            });
            return (<EditableTask {...taskProps} />);
        });
        return (
            <section className="list-container">
                <div className="ui dividing header">{this.props.listName}</div>
                <div id={this.props.category + "-list"}>{taskList}</div>
            </section>
        );
    }
}