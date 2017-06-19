/* global google */
import {
  default as React,
  Component,
} from "react";
import { Link } from 'react-router-dom';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "react-google-maps";
import './index.css'
import SearchBox from "react-google-maps/lib/places/SearchBox";


import { connect } from 'react-redux';
import { PostLocationRequest , GetLocationRequest} from '../../actions';

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
      inputPlaceholder="운동한 공간을 검색하세요!"
      inputStyle={INPUT_STYLE}
    />
     {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.markers.map((marker, index) => {

       return (
         <Marker
           key={index}
           position={marker.position}
           title={(index + 1).toString()}
           label={marker.label}
         >

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
class Map extends Component {

  state = {
    bounds: null,
    center: {
      lat: 47.6205588,
      lng: -122.3212725,
    },
    markers: [],
    directions: null,
  };


    handleRouteClick=this.handleRouteClick.bind(this);
  handleMapMounted = this.handleMapMounted.bind(this);
  handleBoundsChanged = this.handleBoundsChanged.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
    handleDeleteMarkers= this.handleDeleteMarkers.bind(this);
getdistance= this.getdistance.bind(this);
getduration= this.getduration.bind(this);
postMarkers= this.postMarkers.bind(this);
getMarkers= this.getMarkers.bind(this);

componentDidMount(){
  if(this.props.loginStatus===1)
  this.props.getlocation(this.props.match.params.username, this.props.ubase64)
}

   componentWillReceiveProps(nextProps){
     if(this.props.loginStatus===0 && nextProps.loginStatus===1)
     this.props.getlocation(this.props.match.params.username, nextProps.ubase64)
     if (this.props.match.params.username!==nextProps.match.params.username){
       this.props.getlocation(nextProps.match.params.username, nextProps.ubase64)

     }

     this.setState({
       markers: [],
       directions: null
     })
   }

getMarkers(){
  this.props.getlocation(this.props.match.params.username, this.props.ubase64)
  console.log(this.props.route_list)
}
postMarkers(){
  let markers= this.state.markers.slice(0);
  let location_list=[]
  for (var index in markers){
    let location= {
        content: "",
        longitude:0,
        latitude:0
    }
    location.longitude= markers[index].position.lng()
    location.latitude= markers[index].position.lat()

    location_list.push(location)
  }
    console.log(this.state.directions)
    if (this.state.directions!==null){
      let route= {
        duration:0,
        distance:0,
        start_address:"",
        end_address:""
      }
      route.duration=this.getduration(this.state.directions)
      route.distance=this.getdistance(this.state.directions)
      route.start_address=this.state.directions.routes[0].legs[0].start_address
      route.end_address=this.state.directions.routes[0].legs[this.state.directions.routes[0].legs.length-1].end_address
      this.props.postlocation(this.props.ubase64, location_list,route,this.props.match.params.username)

    }else
  this.props.postlocation(this.props.ubase64, location_list,null,this.props.match.params.username)

}
    handleDeleteMarkers(){
      this.setState({
        markers: [],
        directions: null
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
    /*
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
    */
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
          { position: event.latLng, label:{text:(this.state.markers.length+1+'')} },
        ],
      });
      console.log(this.state.markers)
    }
  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => (new google.maps.Marker({
      position: place.geometry.location,
    label:{text:(this.state.markers.length+1+'')}
  })
)
);

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
    const directioninfo=(<div>
      <p>{this.state.directions?this.state.directions.routes[0].legs[0].start_address:null}에서<br/>
      {this.state.directions?this.state.directions.routes[0].legs[this.state.directions.routes[0].legs.length-1].end_address:null}까지<br/>
      {this.getdistance(this.state.directions)}m를 {(this.getduration(this.state.directions)/60).toFixed(0)}분 동안 조깅하셨네요!
      </p>
    </div>)
    return (
      <div>
      <div>
      {this.props.uname===this.props.match.params.username?<h1>내 운동 지도</h1>:<h1>{this.props.match.params.username}님의 운동 지도</h1>}
      <p>운동한 지점을 표시하고, 운동 시간을 계산해보세요!</p>
      <ul>
      <li>지도를 클릭하거나 검색하면 마커가 생성되어 방문한 곳을 찍을 수 있어요.</li>
      <li>자기 지도로 들어가면 자기와 팔로우한 사람의 위치를 모두 볼 수 있어요.</li>
      <li>친구의 지도로 들어가면 자기와 친구의 위치만 볼 수 있어요.</li>
      <li>찍은 마커들 순서대로 경유하여 조깅 경로와 시간, 거리를 검색할 수 있어요.</li>
      <li>구글 맵이 한국의 도보 검색을 지원하지 않아서, 미국의 지도만 경로검색할 수 있어요. ㅠ.ㅠ</li>
      <li>마커와 경로를 포스트해서 친구들에게 알리세요!</li>

      </ul>
      {this.props.uname===this.props.match.params.username?
        <div>
        <Link className="Button" to={'/map/'}>지도 메인으로 돌아가기</Link>
        <Link className="Button" to={'/dietgraph/'+this.props.uname}>내 그래프 보러가기</Link>
        <Link className="Button" to={'/wall/'+this.props.uname}>내 담벼락 보러가기</Link>
        </div>
      :
      <div>
      <Link className="Button" to={'/map/'}>지도 메인으로 돌아가기</Link>
    <Link className="Button" to={'/dietgraph/'+this.props.match.params.username}>{this.props.match.params.username}님의 그래프 보러가기</Link>
    <Link className="Button" to={'/wall/'+this.props.match.params.username}>{this.props.match.params.username}님의 담벼락 보러가기</Link>
    <Link className="Button" to={'/map/'+this.props.uname}>내 지도 보러가기</Link>
    </div>

      }

      </div>
      <div style={{width:"30%", float:"left"}}>
      {this.props.route_list.slice(0).reverse().map(function(item){
        return (
          <RouteInfo route={item}/>
  )
      })}
      </div>


      <div>
      {this.state.directions?directioninfo:null}
      <button className="Button" onClick={this.handleRouteClick}>지도에 찍은 기점을 바탕으로 운동 경로를 계산하세요!</button>
      <button className="Button" onClick={this.handleDeleteMarkers}>실수하셨으면 이곳을 눌러 초기화하세요!</button>
      <button className="Button" onClick={this.postMarkers}>방문하신 경로를 포스트하세요!</button><br/>
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
        markers={[...this.state.markers,...this.props.location_list.map(({longitude, latitude, author})=>({
          position:{lng: longitude, lat: latitude}, label:{text:author, }
        }))]}
        onMapClick={this.handleMapClick}
        directions={this.state.directions}


      />
      </div>
      </div>
    );
  }
}
class RouteInfo extends Component{

  render(){
    return(
      <div>
      <p>{this.props.route.created.getMonth()+1}월  {this.props.route.created.getDate()}일 {this.props.route.created.getHours()}시</p>
      <p>{this.props.route.author}님이<br/>{this.props.route.start_address}부터<br/>{this.props.route.end_address}까지<br/>{this.props.route.distance}m를 {(this.props.route.duration/60).toFixed(0)}분 운동했어요!</p>

      </div>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    avatar: state.userlist_reducer.avatar,
    usernames: state.userlist_reducer.usernames,
    article_list: state.article_list_reducer.article_list,
    //article_list: state.wall_reducer.article_list,
    loginStatus: state.login_reducer.loginStatus,
    uname: state.login_reducer.uname,
    ubase64: state.login_reducer.ubase64,
    location_list: state.map_reducer.location_list,
    route_list: state.map_reducer.route_list
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    getlocation: (uname, ubase64)=> dispatch(GetLocationRequest(uname,ubase64)),
    postlocation: (ubase64, location, route, uname)=>dispatch(PostLocationRequest(ubase64, location,route, uname)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
