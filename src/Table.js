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

    renderLabelCell(i) {
        return (
            <LabelCell
                label={this.props.labels[i]}
            />
        );
    }

    render() {
        //wait for passed in custom min/max values or labels, will override (if none passed in, don't render table)
        if (!this.props.minValues || !this.props.maxValues || !this.props.labels)
            return null;

        return (
            <div>
                <br />
                <table>
                    <TableHeader 
                        tableLabel={this.props.tableLabel}
                    />

                    <TableBody
                        rows={this.props.rows}
                        renderLabelCell={(i) => this.renderLabelCell(i)}
                        renderStaticCell={(i,type) => this.renderStaticCell(i,type)}
                        renderDynamicCell={(i) => this.renderDynamicCell(i)}
                    />
                </table>
            </div>
        );
    }
}

class TableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
                    <th className="lcol" bgcolor={'white'}>{this.props.tableLabel}</th>
                    <th className="othercol" bgcolor={'white'}>Min</th>
                    <th className="othercol" bgcolor={'white'}>Actual</th>
                    <th className="othercol" bgcolor={'white'}>Max</th>
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
                {this.props.renderLabelCell(i)}
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

export default Table;