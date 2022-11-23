'use strict';

const {getPlaiceholder} = require('plaiceholder');
const {getService} = require('../utils');

module.exports = ({strapi}) => ({
    /**
     * Generates a base64 placeholder image for the given image.
     * @param {string} url a local or remote image URL to generate a placeholder for
     * @returns {Promise<{base64: String, blurhash: String}>} a base64 and blurhash encoded placeholder image
     */

    async generate(url) {
        try {
            const settings = getService(strapi, 'settings').get();
            const {base64, blurhash} = await getPlaiceholder(url, settings);
            return {base64, blurhash: blurhash.hash};
        } catch (e) {
            strapi.log.error(e);
            return null;
        }
    },
});
