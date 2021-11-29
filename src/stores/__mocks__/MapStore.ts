const mockMapStore = jest.fn().mockImplementation(() => {
  return {
    constructMap: jest.fn(),
    cleanup: jest.fn(),
  };
});

export default mockMapStore;
