class EditableTask extends React.Component {
    handleTaskClick = (e) => {
        e.stopPropagation();
        this.props.editTask(this.props.id, this.props.status);
    };

    handleChangeTaskTitle = (newTitle) => {
        this.props.changeTaskTitle(this.props.id, newTitle, this.props.status);
    };

    render() {
        if(this.props.editing) {
            return (
                <TaskForm
                    title={this.props.title}
                    handleChangeTaskTitle={this.handleChangeTaskTitle}
                />
            );
        } else {
            const actions = !this.props.actions ? "" : this.props.actions.map((action) => {
                const actionProperties = Object.assign({id: this.props.id}, action);
                return (<TaskAction {...actionProperties}></TaskAction>);
            });
            const createdDateString = helpers.formatDateMMDDYYYY(this.props.createdOn);
            const completedDateString = helpers.formatDateMMDDYYYY(this.props.completedOn);
            return (
                <div
                    className={"task ui segment" + " " + this.props.status}
                    id={this.props.id}
                >
                    <h5
                        className="ui header task-content"
                        onClick={this.handleTaskClick}
                    >
                        <div className="title">{this.props.title}</div>
                        <div className="sub header">
                            <span>Created On: {createdDateString}</span>
                            {completedDateString ? <span>, Completed On: {completedDateString}</span> : ""}
                        </div>
                    </h5>
                    <span className="task-actions">
                        {actions}
                    </span>
                </div>
            );
        }
    };
}