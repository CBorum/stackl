import {GET_WORD_CLOUD, GET_WORD_CLOUD_DONE} from './ActionTypes';

export const getWordCloud = query => {
    return {
        type: GET_WORD_CLOUD,
        payload: query,
    }
};

export const getWordCloudDone = res => {
  return {
      type: GET_WORD_CLOUD_DONE,
      payload: res,
  }
}
