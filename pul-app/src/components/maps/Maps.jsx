import React, { useState, useRef } from 'react'

import { 
  GoogleMap, 
  useJsApiLoader, 
  Marker,
  Autocomplete,
 } from '@react-google-maps/api'
import "./Maps.css"
import UtilityForm from '../../modals/UtilityForm'

const containerStyle = {
  width: '90%',
  height: '800px',
  borderRadius:'20px',
  boxShadow:'0px 0px 10px rgba(0,0,0,0.2)',
  margin:'20px',
}

const center = {
  lat: 10.269549499969044,
  lng: 76.40029145981869,
}

export default function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCTtIPE37GzL7AHPhGKzcnQB2iIn0hpWWE',
    libraries:['places']
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [coords, setCoords] = useState({
    lat: "",
    lng: ""
  })
  const [form, setForm] = useState()
  const autocompleteRef = useRef(null);

  const handleClick = (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setCoords({lat,lng})
    setForm(true)
    console.log("Clicked Coordinates", coords)
  }

  const handlePlaceSelect = () => {
    if (!autocompleteRef.current) {
      console.error("Autocomplete reference is null");
      return;
    }

    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry) {
      console.log("No details available for the selected place.");
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setCoords([{ lat, lng }]);

    if (map) {
      map.panTo({ lat, lng });
      map.setZoom(50);
    }
  };

  return isLoaded ? (
    <div className="maps-main">
      <div className="search">
          <Autocomplete 
            className='Auto'
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}            
            onPlaceChanged={handlePlaceSelect}
          >
            <input type="search" placeholder="Search your City" />
          </Autocomplete>
      </div>
      <div className="maps-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={1}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onDblClick={handleClick}
          
          >
          {/* {coords.map((points,index) => (
            <Marker
                position={points}
                key={index}
            />
          ))} */}
            <></>
          </GoogleMap>
      </div>
      {form && 
        <UtilityForm
          setForm = {setForm}
          form = {form}
          lat = {coords.lat}
          lng = {coords.lng}
        
        />
      }

    </div>
    ) : 
    (
        <></>
    )
}

