'use strict';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const Application = require('./application');

dotenv.config({
    path: path.resolve(__dirname, '../.evn'),
});

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/gateway', async (req, res) => {
    try {
        const gateways = await Application.resolveGateways();
        res.json(gateways);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.get('/api/gateway/:id', async (req, res) => {
    try {
        const gateway = await Application.resolveGateway(req.params.id);
        res.json(gateway);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.post('/api/gateway', async (req, res) => {
    try {
        const gateway = await Application.createGateway(req.body);
        res.json(gateway);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.put('/api/gateway/:id', async (req, res) => {
    try {
        const gateway = await Application.updateGateway(req.params.id, req.body);
        res.json(gateway);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.delete('/api/gateway/:id', async (req, res) => {
    try {
        await Application.deleteGateway(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.post('/api/gateway/device', async (req, res) => {
    try {
        const device = await Application.addDevice(req.body);
        res.json(device);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

app.put('/api/gateway/device/:id', (req, res) => {
    throw new Error('not implemented');
    res.sendStatus(500);
});

app.delete('/api/gateway/device/:id', (req, res) => {
    // TODO: update device to gateway
});


app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});


// TODOs
// db
// docker
