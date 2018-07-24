
// Environmrnt object
const environments = new Object();

// Staging environment
environments.staging = {

    httpPort: 3000,
    httpsPort: 5000,
    envName: 'staging'

}

// Production environment
environments.production = {

    httpPort: 3001,
    httpsPort: 5001,
    envName: 'production'

}

// chosen environment
const chosenEnv = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// exported environment
const envToExport = typeof (environments[chosenEnv]) !== "undefined" ? environments[chosenEnv] : environments.staging;


module.exports = envToExport;