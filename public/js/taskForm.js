class TaskForm extends React.Component {
    state = {
        fields: {
            title: this.props.title
        },
        errors: {}
    };

    validateField = (name, value) => {
        let errors = this.state.errors;
        if(name === "title") {
            if(!value) {
                errors[name] = "Title cannot be empty";
            } else {
                delete errors[name];
            }
        }
        this.setState({errors: errors});
    };

    handleInputBlur = (e) => {
        this.handleSubmit(e);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(this.state.errors).length === 0) {
            this.props.handleChangeTaskTitle(this.state.fields.title);
        } else {

        }
    };

    handleInputChange = (e) => {
        if(!this.state.errors[e.target.name]) {
            const fields = this.state.fields;
            fields[e.target.name] = e.target.value;
            this.setState({fields: fields});
        }
    };

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
            >
                <TaskFormField
                    name="title"
                    placeholder="Add Todo Description..."
                    autoFocus={true}
                    handleInputChange={this.handleInputChange}
                    handleInputBlur={this.handleInputBlur}
                    validate={this.validateField}
                    value={this.state.fields.title}
                    error={this.state.errors.title}
                />
            </form>
        );
    }
}