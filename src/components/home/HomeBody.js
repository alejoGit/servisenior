import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export const HomeBody = ()=>{
	const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=santiago&appid=cb3ccf107904ac1bc2696def8cf0fef2&lang=es&units=metric';
	const [list, setList] = useState([]);
	
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fetch(API_URL);
		const data = await response.json();
		data.list.forEach((item)=>{
			item.dt = formatDate(new Date(item.dt_txt));
		});
		setList(data.list);
	}
	const formatDate = (date) => {
		const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		return weekdays[date.getDay()] + ' ' + date.getDate() + ' de ' + months[date.getMonth()]
	}
	const filterListByDate = (date) =>{
		return list.filter((item)=> item.dt === date );
	}
	const getTemp = (date, type) => {
		const filteredList = filterListByDate(date);
		let sum = filteredList.reduce(function(total, nextValue){
		  return total + nextValue.main[type];
		}, 0);
		return (sum / filteredList.length).toFixed(2)
	}
	const getIcon = (date) => {
		const filteredList = filterListByDate(date);
		return ( 
			<div>
				<img src={`http://openweathermap.org/img/wn/${filteredList[filteredList.length-1].weather[0].icon}@2x.png`} />
			</div>
		)
	}
	const getDescription = (date) => {
		const filteredList = filterListByDate(date);
		return ( 
			<small>
				{filteredList[filteredList.length-1].weather[0].description}
			</small>
		)
	}
	const unique = (value, index, self) => { 
	    return self.indexOf(value) === index;
	}
	const next5Days = () => {
		let next5Days = [];
		next5Days = list.map((item)=>{
			return item.dt;
		});
		next5Days = next5Days.filter(unique);
		if(next5Days.length > 5) {
			next5Days = next5Days.slice(0,5);
		}
		return next5Days.map((date)=>{
			return( 
				<div className="day-item__wrapper" key={date}>
					<div>
						{getIcon(date)}
					</div>
					<div>
						<div className="d-flex align-items-center">
							<h2 className="mr-1">{ date }</h2> {getDescription(date)}
						</div>
						<div>
							<b>Temperatura Maxima:</b> {getTemp(date,'temp_max')}°C
							
						</div>
						<div className="mt-1">
							<b>Temperatura Minima:</b> {getTemp(date,'temp_min')}°C
						</div>
						<div className="mt-1">
							<Link to={date.replace(/\s/g, '-')} className="btn mt-1">Ver detalle</Link>
						</div>	
					</div>
				</div>
			)
		});
	}

	return(
		<div>
			{ next5Days() }
	    </div>
	)
}
