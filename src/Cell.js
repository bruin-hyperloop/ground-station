import React, {Component} from 'react';

function LabelCell(props) {
  return (
    <td className="lcol"
    bgcolor={'white'}>
        {props.label}
    </td>
  )
}

function StaticCell(props) {
  return (
    <td className="othercol"
    bgcolor={'white'}>
        {props.value}
    </td>
  )
}

function DynamicCell(props) {
  return (
    <td className="othercol"
    bgcolor={props.bgColor}>
        {props.value}
    </td>
  )
}

export {
	LabelCell,
	StaticCell,
	DynamicCell
}