// export const RootStore = jest.fn().mockImplementation(() => {
//   return {
//     useStore: jest.fn(),
//   };
// });

export const useStore = jest.fn().mockImplementation(() => {
  return {
    mapStore: {
      constructMap: jest.fn(),
      cleanup: jest.fn(),
    },
  };
});

const mockRootStore = jest.fn().mockImplementation(() => {
  return {};
});

export default mockRootStore;
