import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';


const containerStyle = {
  width: '1000px',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const center = {
  lat: 51.5072,
  lng: 0.1276
};

const options = {
    fillColor: "white",
    fillOpacity: 1,
    strokeColor: "black",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
    styles:[
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          { visibility: 'off' }
        ]
        },{
          featureType: 'landscape',
          stylers: [
            { visibility: 'off' }
          ]
        },{
          featureType: 'road',
          stylers: [
            { visibility: 'off' }
          ]
        },{
          featureType: 'administrative',
          stylers: [
            { visibility: 'off' }
          ]
        },{
          featureType: 'poi',
          stylers: [
            { visibility: 'off' }
          ]
        },,{
          featureType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        }
    ]
  }
  
  
const getCoordinatedGeoJson =(data) =>{
  let polyArray = []
  let geoJsonData = data.features
  
  geoJsonData.map((g)=>{
    let geometryData = g.geometry.coordinates
    geometryData.map((coordinates)=>{
      coordinates.map((latlngCoords)=>{
        let latLongArray = []
        latlngCoords.forEach((latlong)=>{
          latLongArray.push({lng: (latlong[0]), lat: (latlong[1])})
        })
        polyArray.push(latLongArray)
      })
    })
  })
  return polyArray
}
function Maps() {
  const [latlongData, setlatlongData] = useState([])
  useEffect(()=>{
    fetch(`https://raw.githubusercontent.com/saikiranb/geojson/main/england.json`)
    .then((res)=>res.json())
    .then((data)=> setlatlongData(getCoordinatedGeoJson(data)))
    .catch((err)=>console.log(err))
  },[])
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyC6Qu_AVrS5PaWhvelurKMvHe2QykTSg8Y"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        // options={options}
        
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Polygon
          paths={latlongData}
          options={options}
        />
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Maps)