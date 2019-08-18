import React, {Component} from 'react';
import {LabelCell, StaticCell, DynamicCell} from './Cell';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    renderDynamicCell(i) {
        return (
            <DynamicCell
                value={this.props.values[i]}
                bgColor={this.props.bgColors[i]}
            />
        );
    }

    //type is either maximum or minimum
    renderStaticCell(i,type) {
        
        let extremeValue = 0;
        if (type === 'max' || type === 'maximum')
            extremeValue = this.props.maxValues[i];
        else if (type === 'min' || type === 'minimum')
            extremeValue = this.props.minValues[i];

        return (
            <StaticCell
                value={extremeValue}
                bgColor={this.props.bgColors[i]}
            />
        );
    }

    render() {
        //wait for passed in custom min/max values or labels, will override (if none passed in, don't render table)
        if (!this.props.minValues || !this.props.maxValues)
            return null;

        return (
            <div>
                <br />
                <table class="livetable">
                    <TableHeader 
                        tableLabel={this.props.tableLabel}
                    />

                    <TableBody
                        rows={this.props.rows}
                        renderStaticCell={(i,type) => this.renderStaticCell(i,type)}
                        renderDynamicCell={(i) => this.renderDynamicCell(i)}
                    />
                </table>
            </div>
        );
    }
}

class OverallTable extends Component {
    constructor(props) {
        super(props);
    }

    renderDynamicCell(i,j) {
        return (
            <DynamicCell
                value={this.props.values[j][i]}
                bgColor={this.props.bgColors[i]}
            />
        );
    }

    render() {
        return (
            <div>
                <br />
                <table class="overalltable">
                    <OverallTableHeader />

                    <OverallTableBody
                        rows={this.props.rows}
                        renderDynamicCell={(i,j) => this.renderDynamicCell(i,j)}
                    />
                </table>
            </div>
        );
    }
}

class LabelTable extends Component {
    constructor(props) {
        super(props);
    }

    renderLabelCell(i) {
        return (
            <LabelCell
                label={this.props.labels[i]}
            />
        );
    }

    render() {
        return (
            <div>
                <br />
                <table class="labeltable">
                    <LabelTableHeader 
                        tableLabel={this.props.tableLabel}
                    />

                    <LabelTableBody
                        rows={this.props.rows}
                        renderLabelCell={(i) => this.renderLabelCell(i)}
                    />
                </table>
            </div>
        );
    }
}

class LabelTableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    <th className="lcol" bgcolor={'white'}>{this.props.tableLabel}</th>
                </tr>
            </thead>
        );
    }
}

class LabelTableBody extends Component {
    
    renderRow(i)
    {
        return (
            <tr>
                {this.props.renderLabelCell(i)}
            </tr>
        );
    }

    render() {

        let rows = [];

        for (var i = 0; i < this.props.rows; i++) {
            rows.push(this.renderRow(i));
        }

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}

class OverallTableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    <th className="othercol" bgcolor={'white'}>Min</th>
                    <th className="othercol" bgcolor={'white'}>Average</th>
                    <th className="othercol" bgcolor={'white'}>Max</th>
                </tr>
            </thead>
        );
    }
}

class OverallTableBody extends Component {
    
    renderRow(i)
    {
        let row = [];

        for (var j = 0; j < 3; j++)
            row.push(this.props.renderDynamicCell(i,j));

        return (
            <tr>
                {row}
            </tr>
        );
    }

    render() {

        let rows = [];

        for (var i = 0; i < this.props.rows; i++) {
            rows.push(this.renderRow(i));
        }

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}

class TableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    <th className="othercol" bgcolor={'white'}>Min Threshold</th>
                    <th className="othercol" bgcolor={'white'}>Actual</th>
                    <th className="othercol" bgcolor={'white'}>Max Threshold</th>
                </tr>
            </thead>
        );
    }
}

class TableBody extends Component {
    
    renderRow(i)
    {
        return (
            <tr>
                {this.props.renderStaticCell(i,'min')}
                {this.props.renderDynamicCell(i)}
                {this.props.renderStaticCell(i,'max')}
            </tr>
        );
    }

    render() {

        let rows = [];

        for (var i = 0; i < this.props.rows; i++) {
            rows.push(this.renderRow(i));
        }

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}

export {
    Table,
    OverallTable,
    LabelTable
}
