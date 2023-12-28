require('dotenv').config()
module.exports={
    SF_LOGIN_URL:process.env.SF_LOGIN_URL || 'https://login.salesforce.com',
    SERVER_URL:process.env.SERVER_URL || 'http://localhost:3006',
    SF_USERNAME:process.env.SF_USERNAME ||'username',
    SF_PASSWORD:process.env.SF_PASSWORD || 'password',
    SF_CLIENT_ID: process.env.SF_CLIENT_ID || '',
    SF_CLIENT_SECRET: process.env.SF_CLIENT_SECRET || '',
    SF_CALLBACK_URL:process.env.SF_CALLBACK_URL || 'http://localhost:3006/oauth2/callback',
    ML_LOGIN_URL:process.env.ML_LOGIN_URL || 'https://test.salesforce.com',
    ML_SERVER_URL:process.env.ML_SERVER_URL || 'http://localhost:3006',
    ML_USERNAME:process.env.ML_USERNAME ||'username',
    ML_PASSWORD:process.env.ML_PASSWORD || 'password',
    ML_CLIENT_ID: process.env.ML_CLIENT_ID || '',
    ML_CLIENT_SECRET: process.env.ML_CLIENT_SECRET || '',
    ML_CALLBACK_URL:process.env.ML_CALLBACK_URL || 'http://localhost:3006/oauth2/mlcallback'
}
// HOST:process.env.HOST,
// SF_LOGIN_URL:process.env.SF_LOGIN_URL || 'https://login.salesforce.com',
// BACKEND_URL:process.env.BACKEND_URL || 'http://localhost:3006',
// SF_USERNAME:process.env.SF_USERNAME ||'username',
// SF_PASSWORD:process.env.SF_PASSWORD || 'password',
// SF_CLIENT_ID:process.env.SF_CLIENT_ID || '',
// SF_CLIENT_SECRET:process.env.SF_CLIENT_SECRET || '',
// SF_CALLBACK_URL:process.env.SF_CALLBACK_URL || 'http://localhost:3002/oauth2/callback',
// APP_URL:process.env.APP_URL || 'http://localhost:3000'