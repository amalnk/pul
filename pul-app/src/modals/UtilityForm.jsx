import React, { useState } from "react";
import "./UtilityForm.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function UtilityForm(props){

    const [inputData,setInputData] = useState({
        lat: props.lat,
        lng : props.lng,
        name: "",
        type: "",
        from:"",
        to:"",
        desc:""
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        fetch("http://localhost:3001/utilities") // Ensure it matches db.json
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
    
    return(
        <div className="uf-main">
            <div className="top">
                <h1>Add a Utility</h1>
                <FontAwesomeIcon icon={faX} className="close-icon" onClick={() => props.setForm(false)}/>
            </div>
            <div className="info">
                <p>📍 Latitude:{props.lat}</p>
                <p>📍 Longitude:{props.lng}</p>
            </div>

            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name of Utility" 
                    onChange={(e) => setInputData(prevState => ({
                        ...prevState, 
                        name: e.target.value 
                    }))}                     
                    required
                />
                <select 
                    name="" 
                    id="" 
                    required
                    onChange={(e) => setInputData(prevState => ({
                        ...prevState, 
                        type: e.target.value 
                    }))} 
                >
                    <option value="" disabled selected>Choose an option</option>
                    <option value="">Dustbin</option>
                    <option value="">Bathrooms/Restrooms</option>
                    <option value="">Parking</option>
                    <option value="">Feeding Rooms</option>
                </select>
                <div className="time">
                    <label htmlFor=""> Working Hours</label>
                    <div className="timeip">
                        <input 
                            type="time" 
                            placeholder="Working Hours" 
                            required
                            onChange={(e) => setInputData(prevState => ({
                                ...prevState, 
                                from: e.target.value 
                            }))} 
                        />
                        <input 
                            type="time" 
                            placeholder="Working Hours" 
                            required
                            onChange={(e) => setInputData(prevState => ({
                                ...prevState, 
                                to: e.target.value 
                            }))} 
                        />
                    </div>
                </div>
                <textarea 
                    name="" 
                    id="" 
                    placeholder="Description" 
                    required
                    onChange={(e) => setInputData(prevState => ({
                        ...prevState, 
                        desc: e.target.value 
                    }))} 
                    />
                <button type="Submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}