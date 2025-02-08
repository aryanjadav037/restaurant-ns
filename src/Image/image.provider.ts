
import { v2, ConfigOptions } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: "dcu9peqwj",
      api_key: '932981637411768',
      api_secret: 'thxIFgDzz-K8NVbpPnL66WflygQ',
    });
  },
};