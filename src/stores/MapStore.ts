//import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';
import ArcGISMap from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

export default class MapStore {
  rootStore: RootStore;
  map!: __esri.Map;
  geoJsonLayer!: __esri.GeoJSONLayer;

  constructor(rootStore: RootStore) {
    //makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  constructMap(container: string) {
    const sketchLayer = new GraphicsLayer();

    // Create the map and add the graphics layer
    this.map = new ArcGISMap({
      basemap: 'streets-vector',
      layers: [sketchLayer],
    });

    // Set the map view, including location and zoom level
    const view = new MapView({
      map: this.map,
      container,
      center: [-83.221564, 42.446424], // Longitude, latitude
      zoom: 9,
    });

    // When the view finishes loading, add the sketch widget
    view.when(() => {
      const sketch = new Sketch({
        layer: sketchLayer,
        view,
        // graphic will be selected as soon as it is created
        creationMode: 'update',
      });

      view.ui.add(sketch, 'top-right');
    });
  }

  addData = (geoJson: GeoJSON.FeatureCollection) => {
    // Clear any existing data
    this.clearData();

    // Create a blob of the GEOJSON feature collection to
    // serve up to the ESRI GEOJSONLayer via object URL
    const blob = new Blob([JSON.stringify(geoJson)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    this.geoJsonLayer = new GeoJSONLayer({ url });

    // Add data to map
    this.map.add(this.geoJsonLayer);
  };

  clearData() {
    if (this.geoJsonLayer) this.map.remove(this.geoJsonLayer);
  }

  cleanup() {
    // Todo, remove any listeners
  }
}
