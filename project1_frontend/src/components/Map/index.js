/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "react-google-maps";

import SearchBox from "react-google-maps/lib/places/SearchBox";

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const SearchBoxExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick}

  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Customized your placeholder"
      inputStyle={INPUT_STYLE}
    />
     {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.markers.map((marker, index) => {
       const onClick = () => props.onMarkerClick(marker);
       const onCloseClick = () => props.onCloseClick(marker);

       return (
         <Marker
           key={index}
           position={marker.position}
           title={(index + 1).toString()}
           onClick={onClick}
         >
           {marker.showInfo && (
             <InfoWindow onCloseClick={onCloseClick}>
               <div>
                 <strong>{marker.content}</strong>
                 <br />
                 <em>The contents of this InfoWindow are actually ReactElements.</em>
               </div>
             </InfoWindow>
           )}
         </Marker>
       );
     })}
  </GoogleMap>
));

/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SearchBoxExample extends Component {

  state = {
    bounds: null,
    center: {
      lat: 47.6205588,
      lng: -122.3212725,
    },
    markers: [],

    origin: new google.maps.LatLng(41.8507300, -87.6512600),
    destination: new google.maps.LatLng(41.8525800, -87.6514100),
    directions: null,
  };


    handleRouteClick=this.handleRouteClick.bind(this);
  handleMapMounted = this.handleMapMounted.bind(this);
  handleBoundsChanged = this.handleBoundsChanged.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
    handleCloseClick = this.handleCloseClick.bind(this);
    handleMapClick = this.handleMapClick.bind(this);
    handleDeleteMarkers= this.handleDeleteMarkers.bind(this);
getdistance= this.getdistance.bind(this);
getduration= this.getduration.bind(this);

    handleDeleteMarkers(){
      this.setState({
        markers: []
      })
    }
    handleRouteClick(){
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: this.state.markers[0].position,
        destination: this.state.markers[this.state.markers.length-1].position,
        waypoints : this.state.markers.slice(1,-1).map((item)=>({location: item.position, stopover:true})),
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result)
          this.setState({
            directions: result,
          });

        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
    handleMarkerClick(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: true,
            };
          }
          return marker;
        }),
      });
    }

    handleCloseClick(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: false,
            };
          }
          return marker;
        }),
      });
    }
  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

    handleMapClick(event) {
      this.setState({
        markers: [
          ...this.state.markers,
          { position: event.latLng },
        ],
      });
      console.log(this.state.markers)
    }
  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers: [
        ...this.state.markers,
        ...markers
      ]
    });

    console.log(this.state.markers)
  }
getdistance(directions){
    if (directions){
       let distance=0;
       console.log(directions)
       directions.routes.forEach(function(entry){
         entry.legs.forEach(
            function(childentry){
            distance+=childentry.distance.value
            }
         )
       }

       )
       return distance
    }else return undefined
  }
  getduration(directions){
      if (directions){
         let duration=0;
         console.log(directions)
         directions.routes.forEach(function(entry){
           entry.legs.forEach(
              function(childentry){
              duration+=childentry.duration.value
              }
           )
         }

         )
         return duration
      }else return undefined
    }
  render() {
    return (
      <div>
      {this.state.markers.map((item)=> (
        <div>{item.content}</div>
      ))}
      <div>이동 거리 :{this.getdistance(this.state.directions)}분</div>
      <div>이동 시간 :{this.getduration(this.state.directions)}초</div>
      <button onClick={this.handleRouteClick}>경로 계산하기</button>
      <button onClick={this.handleDeleteMarkers}>지도 초기화하기</button>
      <SearchBoxExampleGoogleMap
        containerElement={
          <div style={{  height: 700, weight:200 }} />
        }
        mapElement={
          <div style={{  height: 700, weight:200 }} />
        }
        center={this.state.center}
        onMapMounted={this.handleMapMounted}
        onBoundsChanged={this.handleBoundsChanged}
        onSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
        markers={this.state.markers}
        onMapClick={this.handleMapClick}
        directions={this.state.directions}

        onMarkerClick={this.handleMarkerClick}
       onCloseClick={this.handleCloseClick}

      />
      </div>
    );
  }
}