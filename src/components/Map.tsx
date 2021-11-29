import React, { useEffect } from 'react';
import { useStore } from '../stores/RootStore';

const Map = () => {
  const { mapStore } = useStore();

  // https://reactjs.org/docs/hooks-effect.html
  // useEffect tells react that your component needs to do something after it renders
  // In other words, after the DOM has rendered the <div>, useEffect will run.
  // In this case, we want to create a map from the mobx MapStore
  useEffect(() => {
    // When the component loads, create the map
    mapStore.constructMap('map');
    // Return a cleanup function if the map hot-reloads
    return () => {
      mapStore.cleanup();
    };
  }, []);

  return <div id='map'></div>;
};

export default Map;
