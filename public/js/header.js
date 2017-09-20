class TodoHeader extends React.Component {
    state = {
        date: "",
        time: ""
    };

    componentDidMount() {
        this.setTime(new Date());
        setInterval(() => {
            this.setTime(new Date());
        }, 1000);
    };

    setTime = (date) => {
        this.setState({
            date: helpers.formatDateWDMMDDYYYY(date),
            time: helpers.formatTimeHHMM(date)
        });
    };

    render() {
        return (
            <div className="ui segment basic grey inverted secondary">
                <h3 id="greeting">Hi There {'\uD83D\uDC2C'}</h3>
                <span id="today">
                    {this.state.date}
                </span>
                <span id="clock">
                    {this.state.time}
                </span>
            </div>
        )
    }
}

ReactDOM.render(<TodoHeader/>, document.getElementById('header'));