'use strict';

module.exports = ({ strapi }) => {
  if (!strapi.plugin('upload'))
    return strapi.log.warn("Upload plugin is not installed, Plaiceholder won't be started.");

  /* Update the Media Library File content type, adding the placeholder and blurhash field */
  strapi.plugin('upload').contentTypes.file.attributes.placeholder = {
    type: 'text',
  };
  strapi.plugin('upload').contentTypes.file.attributes.blurhash = {
    type: 'text',
  };
};
