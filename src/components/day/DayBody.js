import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const DayBody = ()=>{
	const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=santiago&appid=cb3ccf107904ac1bc2696def8cf0fef2&lang=es&units=metric';
	const [list, setList] = useState([]);
	let { day } = useParams();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await fetch(API_URL);
		const data = await response.json();
		data.list.forEach((item)=>{
			item.dt = formatDate(new Date(item.dt_txt));
			item.hour = new Date(item.dt_txt).toLocaleTimeString()
		});
		setList(data.list);
	}

	const formatDate = (date) => {
		const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		return weekdays[date.getDay()] + ' ' + date.getDate() + ' de ' + months[date.getMonth()]
	}
	
	const getIcon = (icon) => {
		return <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
	}
	const hours = () => {
		let filteredDay = [];
		
		filteredDay = list.filter(item => item.dt === day.replace(/-/g, ' ') );
	
		return filteredDay.map((item)=>{
			return( 
				<div className="day-item__wrapper" key={item.dt_txt}>
					<div>
						{getIcon(item.weather[0].icon)}
					</div>
					<div>
						<div className="d-flex align-items-center">
							<h2 className="mr-1">{item.hour}</h2> {item.weather[0].description}
						</div>
						<div>
							<b>Temperatura Maxima:</b> {item.main.temp_max}°C
							
						</div>
						<div className="mt-1">
							<b>Temperatura Minima:</b> {item.main.temp_min}°C
						</div>	
					</div>
				</div>
			)
		});
	}

	return(
		<div>
			{ hours() }
	    </div>
	)
}
