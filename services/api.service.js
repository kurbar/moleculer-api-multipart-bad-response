"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
    port: process.env.PORT || 3000,
    path: '',

		routes: [
      {
        path: "/import/upload",
        bodyParsers: {
          json: false,
          urlencoded: false,
        },

        aliases: {
          "POST /": "multipart:import.upload",
        },

        busboyConfig: {
          limits: {
            files: 1,
          },
        },

        mappingPolicy: "restrict",

        callOptions: {
          timeout: 0,
        },
      },
    ],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		}
	}
};
