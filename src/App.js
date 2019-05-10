import React, {Component} from 'react';
import Table from './Table';
import openSocket from 'socket.io-client';

//tableNum and rowNum starts at index 0
function updateValue(tableNum,rowNum,newValue)
{
    window.appComponent.updateCell(tableNum,rowNum,newValue);
}

function updateValueTest(value)
{
    window.appComponent.updateCell(1,1,parseInt(value));
}

class App extends Component {
    constructor(props) {
        super(props);
        window.appComponent = this;
        this.state = {
            socket: openSocket('http://localhost:1337'),
            data: null,
            //each index of tables array indicates different table; can have mapping function
            //array indexes correspond to data's row numbers from 0 to n-1 rows
            tables: [
                {
                    tableName: "Battery",
                    tableLabel: "1",
                    labels: ['Voltage','Current','Temperature'],
                    rows: 3,
                    minValues: [20,21,22],
                    maxValues: [40,41,42],
                    values: Array(3).fill(-1),
                    bgColors: Array(3).fill('aqua')
                },
                {
                    tableName: "Battery",
                    tableLabel: "2",
                    labels: ['Voltage','Current','Temperature'],
                    rows: 3,
                    minValues: [20,21,22],
                    maxValues: [40,41,42],
                    values: Array(3).fill(-1),
                    bgColors: Array(3).fill('aqua')
                },
                {
                    tableName: "Pod",
                    tableLabel: "",
                    labels: ['Temperature','Motor 1 Current','Motor 2 Current','Motor 3 Current','Motor 4 Current'],
                    rows: 5,
                    minValues: [20,21,22,23,24],
                    maxValues: [40,41,42,43,44],
                    values: Array(5).fill(-1),
                    bgColors: Array(5).fill('aqua')
                }
            ],
        };
        this.state.socket.on('socket_data', d => { 
            updateValueTest(d)
        });
    }

    updateCell(tableNum,rowNum,newValue)
    {
        const updatedState = this.state;

        let newColor = 'lightgreen';

        if (newValue < this.state.tables[tableNum].minValues[rowNum] || newValue > this.state.tables[tableNum].maxValues[rowNum])
            newColor = '#ff4d4d';

        updatedState.tables[tableNum].values[rowNum] = newValue;
        updatedState.tables[tableNum].bgColors[rowNum] = newColor;

        this.setState(updatedState);
        
    }

    //handleSubmit function used by button as a functionality test method for the updateValue function
    handleSubmit(event) {
        updateValue(0,1,56);
    }

    render() {
        return (
            <div className="container">
            	<br />
                <br />
            	<div className="title">
                    Pod Health Viewer - UCLA Bruin HYPErloop
                </div>
                <br />

                <div className="tableTitle">
                    Battery
                </div>

                <Table
                    tableLabel="1"
                    labels={this.state.tables[0].labels}
                    minValues={this.state.tables[0].minValues}
                    maxValues={this.state.tables[0].maxValues}
                    values={this.state.tables[0].values}
                    bgColors={this.state.tables[0].bgColors}
                    rows={3}
                />
                <br />
                <Table
                    tableLabel="2"
                    labels={this.state.tables[1].labels}
                    minValues={this.state.tables[1].minValues}
                    maxValues={this.state.tables[1].maxValues}
                    values={this.state.tables[1].values}
                    bgColors={this.state.tables[1].bgColors}
                    rows={3}
                />

                <br />
                <br />
                <br />

                <div className="tableTitle">
                    Pod
                </div>

                <Table
                    labels={this.state.tables[2].labels}
                    minValues={this.state.tables[2].minValues}
                    maxValues={this.state.tables[2].maxValues}
                    values={this.state.tables[2].values}
                    bgColors={this.state.tables[2].bgColors}
                    rows={5}
                />
                <br />

                <button onClick={this.handleSubmit}>
                    Test Button
                </button>
                
            </div>
        );
    }
}

export default App;