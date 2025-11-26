import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        // Initialise an array for seenIndexes
        seenIndexes: [],
        // Initialise values as a list or dictionary
        values: {},
        // Initialise index as a empty string
        index: ''
    };
    componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
}

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data
        });
    }

    handleSubmit = async (event) => {
        // Prevents the form from being submitted upon click
        event.preventDefault();
        
        await axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({index: ''});

    }

    renderSeenIndexes() {
        // result would be a list of numbers

        return (this.state.seenIndexes.map(({number})=> number).join(', '));
    }
    //renderValues() {
    //    var listOfIndexes = renderSeenIndexes()
    //    let text = ""
    //    for(let i=0; i < listOfIndexes.length;i++){
    //        return (text += "For index" + listOfIndexes[i] + "I calculated " + this.state.values.map(({number}) => number))
    //    }
    //}
    renderValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key = {key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
        )};
        return entries;
    } 

    render() {
        // Requires a text input, a button that routes request and a default string that should not be changed. 
        return (
            //<div classname="Route">
            //    <h1>Enter your index: </h1>
            //    <input type="text" placeholder="Enter number here" />
            //    <button>Submit</button>>
            //</div>

            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your index:
                    </label>
                    <input 
                        value={this.state.index}
                        onChange={event => this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen: </h3>
                {this.renderSeenIndexes()}
                <h3>Calculated Values: </h3>
                {this.renderValues()}
            </div>
        );
    }
};

export default Fib;
