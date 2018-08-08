 class TaskFormField extends React.Component {
    handleInputFocus = (e) => {
        e.target.value = this.props.value || "";
    };

    handleInputChange = (e) => {
        this.props.validate(e.target.name, e.target.value);
        this.props.handleInputChange(e);
    };

    render() {
        let error = this.props.error ?  "error" : "";
        return(
            <div className={"ui input fluid large focus" + " " + error}>
                <input
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    autoFocus={this.props.autoFocus}
                    onChange={this.handleInputChange}
                    onBlur={this.props.handleInputBlur}
                    onFocus={this.handleInputFocus}
                />
            </div>
        );
    };
}