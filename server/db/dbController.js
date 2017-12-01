const axios = require('axios');
const fs = require('fs');
const parse = require('csv-parse');
const winston = require('winston');

const appSettings = require('../../config/app_settings.json');
const util = require('../util/serverUtility');

const STAR_DB = '/home/kwilliams/repositories/research/starhopping/server/db/hygfull.csv';
const DSO_DB = './dso.csv';

const RA_START_RECORD = {
  'RA-0': 1
}

const RA_END_RECORD = {}

/**
 * Controller for handling all location calls through the server side.
 * @type {{getZipCode: module.exports.getZipCode}} - the getZipCode method
 */
module.exports = {
  getStars: async function(request, response) {

    try {
      const { raFrom, decFrom, raTo, decTo, magLimit } = request.query;

      let stars = await loadStars(raFrom, decFrom, raTo, decTo, magLimit);
      // winston.debug('stars=', stars);
      if (stars && stars.length > 0) {
        response.json({
          status: util.parseServiceSuccessStatus('success'),
          stars: stars,
        });
      } else {
        response.json({
          status: util.parseServiceSuccessStatus('no results found'),
        });
      }
    } catch (error) {
      /**
             * Catch the error and log it.
             * Then send back a status object including information about the error.
             */
      winston.error('/api/stars error=', error);
      response.json(util.parseServiceErrorStatus('Error looking up stars', 'No stars returned', error, util.ERROR));
    }
  },
};

/**
 * Parse over the star csv database and only return objects that match
 *
 * TODO make return a promise?
 *
 * @param raFrom
 * @param decFrom
 * @param raTo
 * @param decTo
 * @param magLimit
 */
async function loadStars(raFrom, decFrom, raTo, decTo, magLimit) {
  return new Promise(function(resolve, reject) {

    const parser = parse({
      columns: true,
      ltrim: true,
      rtrim: true
    });
    const rs = fs.createReadStream(STAR_DB);

    const stars = [];

    parser.on('readable', function () {

      while (starEntry = parser.read()) {
        // winston.debug('starEntry=', starEntry);
        if (Number(starEntry.RA) >= Number(raFrom)
          && Number(starEntry.RA) <= Number(raTo)
          && Number(starEntry.Dec) > Number(decFrom)
          && Number(starEntry.Dec) < Number(decTo)
          && Number(starEntry.Mag) < Number(magLimit)) {

          stars.push(starEntry);
        }
      }

    })

    parser.on('error', function (err) {
      winston.error("read error", err);
      reject(err);
    });

    parser.on('finish', function () {
      // stars.map(star => {
      //   winston.debug('star=', star);
      // })

      winston.info(`\tfound ${stars.length} stars`);

      resolve(stars);
    })

    rs.pipe(parser);
  });
}

// loadStars(0, 36, 1, 39, 6);
