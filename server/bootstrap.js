'use strict';

const { getService, canGeneratePlaceholder } = require('./utils');

module.exports = ({ strapi }) => {
  /* Generate a placeholder when a new image is uploaded or updates */

  const generatePlaceholder = async (event) => {
    const { data } = event.params;
    if (!canGeneratePlaceholder(data)) return;
    const {base64, blurhash} = await getService(strapi, 'placeholder').generate(data.url);
    data.placeholder = base64;
    data.blurhash = blurhash;
  };

  strapi.db.lifecycles.subscribe({
    models: ['plugin::upload.file'],
    beforeCreate: generatePlaceholder,
    beforeUpdate: generatePlaceholder,
  });
};
