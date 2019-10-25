//Updated 9-23-19

import React, {Component} from 'react';
import {Table, OverallTable, LabelTable} from './Table';
import openSocket from 'socket.io-client';
import hyperloop_logo from './hyperloop_logo.png';
import TI_logo from './TI_logo.png';

//mappings for string parsing in updateCell
var tableNumbers = {
    "B1": 0,
    "B2": 1,
    "Pod": 2,
};

var rowNumbers = {
    "Voltage": 0,
    "Current": 1,
    "bTemp": 2,
    "pTemp": 0,
    "M1": 1,
    "M2": 2,
    "M3": 3,
    "M4": 4,
};

var columnNumbers = {
    "Min": 0,
    "Avg": 1,
    "Max": 2,
};

//tableNum and rowNum starts at index 0
function updateValue(d)
{
    var data = d.toString();
    var val_name = data.split(':')[0];
    var val = parseFloat(data.split(':')[1]);

    window.appComponent.updateCell(val_name, val);
}

//onClick functionalities for custom buttons
function killSystem()
{
    alert("KILL SYSTEMS!");
}

function clearStats()
{
    alert("CLEAR STATS!");
}

function downloadLogs()
{
    alert("DOWNLOAD LOGS!");
}

class App extends Component {
    constructor(props) {
        super(props);
        window.appComponent = this;
        this.state = {
	        socket: openSocket('http://localhost:1337'),
            data: null,

            //each index of tables array indicates different table
            //array indexes correspond to data's row numbers from 0 to n-1 rows
            labeltables: [
                {
                    tableName: "Battery",
                    tableLabel: "1",
                    labels: ['Voltage','Current','Temperature'],
                    rows: 3,
                },
                {
                    tableName: "Battery",
                    tableLabel: "2",
                    labels: ['Voltage','Current','Temperature'],
                    rows: 3,
                },
                {
                    tableName: "Pod",
                    tableLabel: "1",
                    labels: ['Temperature','Motor 1 Current','Motor 2 Current','Motor 3 Current','Motor 4 Current'],
                    rows: 5,
                },
            ],

            livetables: [
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

            overalltables: [
                {
                    tableName: "Battery",
                    tableLabel: "1",
                    rows: 3,
                    values: [
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                    ],
                    bgColors: Array(3).fill('white'),
                },
                {
                    tableName: "Battery",
                    tableLabel: "2",
                    rows: 3,
                    values: [
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                    ],
                    bgColors: Array(3).fill('white'),
                },
                {
                    tableName: "Pod",
                    tableLabel: "",
                    rows: 5,
                    values: [
                        Array(5).fill(-1),
                        Array(5).fill(-1),
                        Array(5).fill(-1),
                    ],
                    bgColors: Array(5).fill('white'),
                }
            ],
        };
	    this.state.socket.on('socket_data', d => { 
            updateValue(d)
        });
    }

    updateCell(tableString, newValue)
    {
        const updatedState = this.state;

        let newColor = 'lightgreen';
        let tableNum;
        let rowNum;
        let modifyLive;
        let columnNum;
        let parsedTableString = tableString.split("_");

        if (parsedTableString.length != 3)
        {
            console.log("Error: table string for update function is invalid.")
            return;
        }

        //properly set tableNum index
        if (!(parsedTableString[0] in tableNumbers))
        {
            console.log("Error: table string for update function is invalid.")
            return;
        }
        else
            tableNum = tableNumbers[parsedTableString[0]];

        //properly set rowNum
        if (!(parsedTableString[1] in rowNumbers))
        {
            console.log("Error: table string for update function is invalid.")
            return;
        }
        else
            rowNum = rowNumbers[parsedTableString[1]];

        //properly set columnNum
        if (parsedTableString[2] == "Actual")
            modifyLive = true;
        else
        {
            modifyLive = false;
            if (!(parsedTableString[2] in columnNumbers))
            {
                console.log("Error: table string for update function is invalid.")
                return;
            }
            else
                columnNum = columnNumbers[parsedTableString[2]];
        }

        //update value and bgColor in state object
        if (modifyLive)
        {
            if (newValue < this.state.livetables[tableNum].minValues[rowNum] || newValue > this.state.livetables[tableNum].maxValues[rowNum])
                newColor = '#ff4d4d';

            updatedState.livetables[tableNum].values[rowNum] = newValue;
            updatedState.livetables[tableNum].bgColors[rowNum] = newColor;
        }
        else
        {
            console.log(newValue);
            updatedState.overalltables[tableNum].values[columnNum][rowNum] = newValue;
        }

        this.setState(updatedState);
    }

    //handleSubmit function used by button as a functionality test method for the updateValue function
    handleSubmit(event) {
        updateValue(0,1,56);
    }

    render() {
        return (
            <div class="full-container">
                <table class="container">
                    <div class="logocolumn">
                        <img src={hyperloop_logo} alt="Bruin Hyperloop"  width="348" height="80" />
                    </div>

                    <div class="titlecolumn">
                        <div class="title">
                            Bruin Hyperloop Web Dashboard 
                        </div>
                    </div>

                    <div class="logocolumn">
                        <img src={TI_logo} alt="Texas Instruments" width="220" height="66" />
                    </div>
                </table>

                <div class="tableTitle">
                    Battery
                </div>

                <table class="container">
                    <div class="labelcolumn">
                        <br />
                        <LabelTable
                        tableLabel={this.state.labeltables[0].tableLabel}
                        labels={this.state.labeltables[0].labels}
                        rows={this.state.labeltables[0].rows}
                        />

                        <LabelTable
                        tableLabel={this.state.labeltables[1].tableLabel}
                        labels={this.state.labeltables[1].labels}
                        rows={this.state.labeltables[1].rows}
                        />
                    </div>

                    <div class="pagecolumn">
                        <br />
                        <Table
                        tableLabel={this.state.livetables[0].tableLabel}
                        minValues={this.state.livetables[0].minValues}
                        maxValues={this.state.livetables[0].maxValues}
                        values={this.state.livetables[0].values}
                        bgColors={this.state.livetables[0].bgColors}
                        rows={this.state.livetables[0].rows}
                        />

                        <Table
                        tableLabel={this.state.livetables[1].tableLabel}
                        minValues={this.state.livetables[1].minValues}
                        maxValues={this.state.livetables[1].maxValues}
                        values={this.state.livetables[1].values}
                        bgColors={this.state.livetables[1].bgColors}
                        rows={this.state.livetables[1].rows}
                        />
                    </div>

                    <div class="pagecolumn">
                        <div class="tableSmallTitle">
                            Statistics
                        </div>

                        <OverallTable
                        values={this.state.overalltables[0].values}
                        bgColors={this.state.overalltables[0].bgColors}
                        rows={this.state.overalltables[0].rows}
                        />

                        <OverallTable
                        values={this.state.overalltables[1].values}
                        bgColors={this.state.overalltables[1].bgColors}
                        rows={this.state.overalltables[1].rows}
                        />
                    </div>
                </table>

                <br />

                <div class="tableTitle">
                    Pod
                </div>

                <table class="container">
                    <div class="labelcolumn">
                        <br />

                        <LabelTable
                        tableLabel={this.state.labeltables[2].tableLabel}
                        labels={this.state.labeltables[2].labels}
                        rows={this.state.labeltables[2].rows}
                        />
                    </div>

                    <div class="pagecolumn">
                        <br />

                        <Table
                            labels={this.state.livetables[2].labels}
                            minValues={this.state.livetables[2].minValues}
                            maxValues={this.state.livetables[2].maxValues}
                            values={this.state.livetables[2].values}
                            bgColors={this.state.livetables[2].bgColors}
                            rows={5}
                        />
                    </div>
                    <div class="pagecolumn">
                        <div class="tableSmallTitle">
                            Statistics
                        </div>

                        <OverallTable
                            values={this.state.overalltables[2].values}
                            bgColors={this.state.overalltables[2].bgColors}
                            rows={5}
                        />
                    </div>
                </table>

                <br />

                <table class="container" height="140px">
                    <div class="killButtonColumn">
                        <button class="killButton" onClick={(i) => killSystem()}>KILL SWITCH</button>
                    </div>

                    <div class="statsButtonColumn">
                        <div class="statsButtonContainer">
                            <button class="clearStatsButton" onClick={(i) => clearStats()}>Clear Statistics</button>
                        </div>

                        <div class="statsButtonContainer">
                            <button class="downloadLogsButton" onClick={(i) => downloadLogs()}>Download Logs</button>
                        </div>
                    </div>
                </table>
            </div>
        );
    }
}

export default App;