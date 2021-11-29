import { makeAutoObservable } from 'mobx';
import { getSampleData } from '../services/SampleDataService';
import RootStore from './RootStore';

const STATES = {
  INITIAL: 'initial',
  LOADING: 'loading',
  ERROR: 'error',
  LOADED: 'loaded',
};

export default class DataStore {
  rootStore: RootStore;
  state: string = STATES.INITIAL;

  constructor(rootStore: RootStore) {
    // https://mobx.js.org/observable-state.html#makeautoobservable
    makeAutoObservable(this, { rootStore: false }, { autoBind: true });
    this.rootStore = rootStore;
  }

  // Generator function is automatically bound to 'this' in the constructor
  // Learn more about async flows: https://www.mobxjs.com/best/actions.html#flows
  *loadSampleData() {
    this.updateState(STATES.LOADING);
    const data: GeoJSON.FeatureCollection = yield getSampleData();
    this.rootStore.mapStore.addData(data);
    this.updateState(STATES.LOADED);
  }

  clearSampleData() {
    this.rootStore.mapStore.clearData();
  }

  // Inferred as an 'action'
  updateState(state: string) {
    this.state = state;
  }

  // Getter is inferred as a 'view'
  get isLoading() {
    return this.state == STATES.LOADING;
  }
}
