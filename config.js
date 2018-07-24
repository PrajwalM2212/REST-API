const environments = new Object();


environments.staging = {

    httpPort: 3000,
    httpsPort: 5000,
    envName: 'staging'

}


environments.production = {

    httpPort: 3001,
    httpsPort: 5001,
    envName: 'production'

}

const chosenEnv = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const envToExport = typeof (environments[chosenEnv]) !== "undefined" ? environments[chosenEnv] : environments.staging;


module.exports = envToExport;