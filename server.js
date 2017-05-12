const express = require('express')
const fingerprint = require('express-fingerprint')
const requestIp = require('request-ip')

const app = express()
const port = process.env.PORT || 3000

app.use(fingerprint({
  parameters: [
    fingerprint.useragent
  ]
}))

app.use(requestIp.mw())

app.get('/api/whoami', (req, res) => {

  const os = req.fingerprint.components.useragent.os.family
  const ip = req.clientIp
  const lang = req.headers['accept-language'].split(',')[0]
  res.json({
    ip,
    os,
    lang
  })
})

app.get('*', (req, res) => {
  res.send(`
    <div style="height:100vh;display:flex;justify-content:center;flex-direction:column;align-items:center;">
      <h1>FreeCodeCamp header parser </h1>
      <p>Visit /api/whoami for client info </p>
    </div>
  `)
})

app.listen(port)
