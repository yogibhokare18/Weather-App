import axios from "axios";

import moment from "moment";

import { useEffect, useState } from "react"



export function Weather(){



    const [weatherObj, setWeatherObj] = useState({weather:[{description:''}], main:{ temp:0, humidity:0}, name:'', wind:{speed:0}});

    const [now] = useState(new Date());

    const [changingCityName, setChangingCityName] = useState('');

    const [submitCityName, setSubmitCityName] = useState('Hyderabad');



    function handleCityChange(e){

        setChangingCityName(e.target.value);

    }   

    function handleSearchClick(){

        setSubmitCityName(changingCityName);

    }



    function LoadWeatherData(){

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${submitCityName}&appid=1318ca6725c69160d346c41fc0612596&units=metric`)

        .then(response=>{

            setWeatherObj(response.data);

        })

    }



    useEffect(()=>{

        LoadWeatherData();

    },[submitCityName])



   return(

    <div>

        <header className="bg-light p-2 d-flex flex-row justify-content-between align-items-center fs-5">

            <div>

                <span className="bi fw-bold bi-cloud"> Weather App</span>

            </div>

            <nav className="fs-6">

                <span>Current Weather</span>

                <span className="mx-4">Forecast</span>

                <span>Air Quality</span>

                <span className="mx-4">Saved Cities</span>

            </nav>

            <div>

                <div className="input-group">

                <input onChange={handleCityChange} type="text" className="form-control" placeholder="search city" />

                <button onClick={handleSearchClick} className="btn btn-dark bi bi-search"></button>

                </div>

            </div>

            <div>

                <span className="bi bi-gear-fill"></span>

                <span className="bi mx-3 bi-person-fill"></span>

            </div>

        </header>

        <main className="row p-5 m-5">

            <section className="col-2 bg-light p-2">

                <div className="mt-b fw-bold text-primary">Local Weather</div>

                <div className="mb-4 mt-4">

                    <span className="bi bi-cloud"> Current Weather</span>

                </div>

                <div className="mb-4">

                    <span className="bi bi-calendar-date"> Forecast</span>

                </div>

                <div className="mb-4">

                    <span className="bi bi-geo-alt"> Saved City</span>

                </div>

            </section>

            <section className="col-6">

                <div className="card">

                    <div className="card-header d-flex justify-content-between">

                       <div>

                         <div className="fs-1 fw-bold">{weatherObj.name}</div>

                         <div className="fs-5"> {moment(now).format('dddd DD, MMMM yyyy')} </div>

                       </div>

                       <div className="mt-2">

                           {weatherObj.weather[0].description.toUpperCase()}

                       </div>

                    </div>

                    <div className="card-body">

                         <div className="mt-4 fs-1 fw-bold">

                            {weatherObj.main.temp.toFixed(0)}&deg;C

                        </div>

                    </div>

                    <div className="card-footer d-flex">

                        <div className="card bg-dark text-white w-25 p-2 text-center fs-3 fw-bold">

                            <span className="bi bi-thermometer"> {weatherObj.main.humidity} </span>

                            <div className="fs-6">Humidity</div>

                        </div>

                        <div className="card mx-3 bg-dark text-white w-25 p-2 text-center fs-3 fw-bold">

                            <span className="bi bi-wind"> {weatherObj.wind.speed} </span>

                            <div className="fs-6">Wind</div>

                        </div>

                    </div>

                </div>



            </section>

            <section className="col-4">



            </section>

        </main>

    </div>

   )

}
