/* global google */
import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
} from "react-google-maps";

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMapExample extends Component {

  render() {
    return (
      <div>
      <SimpleMapExampleGoogleMap
        containerElement={
          <div style={{ weight:100, height: 200 }} />
        }
        mapElement={
          <div style={{ weight:100, height: 200}} />
        }
      />
      </div>
    );
  }
}
