import React from 'react';
import { DayBody } from '../components/day/DayBody';
import { useParams } from "react-router-dom";

export default () => {
	let { day } = useParams();
	return (
    <React.Fragment>
    	<h1 className="mx-2">{ day.replace(/-/g, ' ') }</h1>
    	<DayBody />
    </React.Fragment>)
};