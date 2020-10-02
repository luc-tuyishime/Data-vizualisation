import 'dotenv/config';
import axios from 'axios';
import * as urlHelper from './urlHelper';

const { NODE_ENV } = process.env;
const { reactUrl, defaultUrl } = urlHelper.backend;

export default (data = {}) => {
  const { URL } = data;
  const baseURL = URL
        || (reactUrl && `${reactUrl}/api/v1`)
        || (defaultUrl && `${defaultUrl}/api/v1`);

  setInterval(() => {}, 6000);
  return (NODE_ENV === 'test' && axios) || axios.create({ baseURL });
};
