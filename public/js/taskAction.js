class TaskAction extends React.Component {
    handleButtonClick = () => {
        if(this.props.handler) {
            this.props.handler(this.props.id);
        }
    };
    render() {
        return (
            <button
                className={"ui circular button icon inverted mini" + " " + this.props.color}
                onClick={this.handleButtonClick}
            >
                <i className={"icon" + " " + this.props.icon}></i>
            </button>
        );
    };
}