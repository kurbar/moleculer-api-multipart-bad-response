"use strict";

const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', '__uploads');

module.exports = {
	name: "import",

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {
    async upload(ctx) {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const { filePath, meta } = await this.processUploadedFile(ctx);

      return {
        message: "All good",
        filePath,
        meta,
      };
    },
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
    processUploadedFile(ctx) {
      console.log(ctx.meta);
      return new Promise((resolve, reject) => {
        const filePath = path.join(uploadDir, ctx.meta.filename || this.randomName());
        const file = fs.createWriteStream(filePath);

        file.on('error', (err) => {
          reject(err);
        });

        file.on('close', () => {
          resolve({ filePath, meta: ctx.meta });
        });

        ctx.params.pipe(file);
      });
    },
	},
};