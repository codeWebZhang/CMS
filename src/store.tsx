import { init } from '@rematch/core';

import { app } from './models/app';

const store = init({
  models: {
    app,
  }
});
export { store };
