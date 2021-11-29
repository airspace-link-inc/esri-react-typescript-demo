import axios from 'axios';

export const getSampleData = () => {
  //return new Promise(res => setTimeout(res, 1000));

  return axios.get('sampleData/sample.json').then(res => res.data);
};
