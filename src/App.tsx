import React from 'react';
import styled from 'styled-components';
import Map from './components/Map';
import { Button } from 'antd';
import { useStore } from './stores/RootStore';
import { observer } from 'mobx-react-lite';

// Placed here only to show-off styled component
const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 100;
  top: 15px;
  left: 60px;
`;

const App = () => {
  // Load dataStore from context created in RootStore
  const { dataStore } = useStore();

  return (
    <div>
      <ButtonWrapper>
        <Button onClick={dataStore.loadSampleData} loading={dataStore.isLoading}>
          Load Sample
        </Button>
        <Button onClick={dataStore.clearSampleData} style={{ marginLeft: '5px' }}>
          Clear Sample
        </Button>
      </ButtonWrapper>
      <Map />
    </div>
  );
};

// Component must be mobx observed to rerender
export default observer(App);
