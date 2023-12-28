const jsforce = require('jsforce')
const LocalStorage = require('node-localstorage').LocalStorage
const lcStorage = new LocalStorage('./info')
const { ML_LOGIN_URL, ML_CLIENT_ID, ML_CLIENT_SECRET, ML_CALLBACK_URL } = require('../config')
//Initialize OAuth2 Config
const oauth2 = new jsforce.OAuth2({
    loginUrl: ML_LOGIN_URL,
    clientId: ML_CLIENT_ID,
    clientSecret: ML_CLIENT_SECRET,
    redirectUri: ML_CALLBACK_URL
})

//Function to perform Salesforce login
const mllogin = (req, res) => {
    res.redirect(oauth2.getAuthorizationUrl({ scope: 'full' }));
}

//Callback function to get Salesforce Auth token
const mlcallback = (req, res) => {
    console.log(req.query)
    const { code } = req.query
    if (!code) {
        console.log("Failed to get authorization code from server callback")
        return res.status(500).send("Failed to get authorization code from server callback")
    }
    console.log("code", code)
    // res.status(200).send({"success": true,"code":code})
    const conn = new jsforce.Connection({ oauth2: oauth2 })
    conn.authorize(code, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send(err)
        }
        console.log("Access token", conn.accessToken)
        console.log("refresh token", conn.refreshToken)
        console.log("Instance url", conn.instanceUrl)
        lcStorage.setItem('accessToken', conn.accessToken || '')
        lcStorage.setItem('instanceUrl', conn.instanceUrl || '')
        res.status(200).send({
            "success": true,
            "message": "Authorization code fetched successfully",
            "code": code,
            "Access token": conn.accessToken,
            "refresh token": conn.refreshToken,
            "Instance url": conn.instanceUrl
        })
    })
}

// Function to Create Connection
const createConnection = () => {
    let instanceUrl = lcStorage.getItem('instanceUrl')
    let accessToken = lcStorage.getItem('accessToken')
    if (!accessToken) {
        return res.status(200).send({})
    }
    return new jsforce.Connection({
        accessToken,
        instanceUrl
    })
}


const panAuth = (req,res) => {
    const conn = createConnection(res)
    const {consent,pan} = req.body
    conn.apex.post("/panAuth/",{consent,pan},function(err,result){
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ success: true, message: 'Response Fetched Successfully', result:JSON.parse(result) });
        }
    })
}


const panStatus = (req,res) => {
    const conn = createConnection(res)
    const {pan,name,dob,consent} = req.body
    conn.apex.post("/panService/",{pan,name,dob,consent},function(err,result){
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ success: true, message: 'Response Fetched Successfully', result:JSON.parse(result) });
        }
    })
}


const panProfile = (req,res) => {
    const conn = createConnection(res)
    const {consent,pan,panStatus} = req.body
    conn.apex.post("/panProfile/",{pan,panStatus,consent},function(err,result){
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ success: true, message: 'Response Fetched Successfully', result:JSON.parse(result) });
        }
    })
}


module.exports = {
    mllogin,
    mlcallback,
    panAuth,
    panStatus,
    panProfile
}