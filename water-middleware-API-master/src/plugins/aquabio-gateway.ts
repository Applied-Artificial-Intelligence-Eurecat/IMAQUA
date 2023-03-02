import {CorePlugin} from "./core-plugin";
import {randomFloat} from "../utils/plugins-utils";
import axios from "axios";
import {Logger, NotFoundException} from "@nestjs/common";
import moment = require("moment");
import * as dotenv from 'dotenv';

export class AquabioGateway extends CorePlugin{

    private aquaBioToken = 'eyJraWQiOiJhZGQ2MTQ3Ny0yMWU3LTQ1NjktYTQ1Yi0xZDBkOTE1NjlmYzYiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNDMiLCJwZXJtaXNzaW9ucyI6IntcIjIwXCI6WzQzXSxcIjdcIjpbNDNdfSIsImlzcyI6Imh0dHA6Ly93d3cuZWNvZGF0YS5lcyIsInN0YXRpb25zIjoie1wiMjBcIjpbMTEyMSwxMTIyXSxcIjdcIjpbMTA2MSwxMDM5XX0ifQ.Yy7tP-MHFJeB-6Lddb5sYCMCBggICqnMednVyjuLF28JlKnFaAB8Ev15kDgU4jSBlXgr6Ow9F5c-WuOuoHgnBw';
    private measurementMap = {
        'Turbidez':'turbidity',
        'Terbolessa':'turbidity',
        'Materia orgánica (SAC)':'organic_matter',
        'Conductividad':'conductivity',
        'Oxígeno disuelto':'dissolved_oxigen',
        'Absorbance 254': 'absorbance_254',
        'Redox': 'redox',
        'pH':'ph',
        'Temperatura':'temperature',
        'Absorbance comp.': 'absorbance'
    }

    constructor (token: string, params: object){
        super(token, params);
    }

    public async historicValues(origin: string, end: string){
        this.logger.log('Getting information from a real AquaBio Device');
        const thingResponse = await axios.get(`${process.env.ROOT_URL}/things/${this.localParams["deviceId"]}`);
        if (thingResponse.status !== 200) throw new NotFoundException(`The Device measurement cannot be updated`);

        await this.getDeviceData(thingResponse.data, origin, end);

    }
    private async getDeviceData (thingInfo: any, startTime: string, endTime: string){
        this.logger.log(`Checking updates on: ${this.localParams["deviceId"]}`)

        const deviceResponse = await axios.get(`${thingInfo.links[0].href}&startTime=${startTime}&endTime=${endTime}`,{
            headers: {
                Authorization: `Bearer ${this.aquaBioToken}`
            }
        });

        if (deviceResponse.status !== 200) {
            throw new NotFoundException(`The Aqua Bio Device measurement cannot be retrieved`);
        }

        deviceResponse.data.data.measurements.forEach(measurement => {

            measurement.samples.forEach( value => {
                this.logger.log(`Sending data to the WoW Server: ${this.measurementMap[measurement.name]}- ${value.timestamp} -${value.value}`)
                this.updatingMeasurement(value.value, this.measurementMap[measurement.name], value.timestamp)
            })
        })
    }

    async connectHardware() {
        this.logger.log('Getting information from a real AquaBio Device');
        const thingResponse = await axios.get(`${process.env.ROOT_URL}/things/${this.localParams["deviceId"]}`);
        if (thingResponse.status !== 200) throw new NotFoundException(`The Device measurement cannot be updated`);

        this.interval = setInterval(async () => {
            const endTime = moment(new Date()).format('YYYYMMDDHHmmss')
            const startTime = moment(new Date()).subtract(this.localParams['frequency'], 'millisecond').format('YYYYMMDDHHmmss');

            await this.getDeviceData(thingResponse.data, startTime, endTime)

        }, this.localParams['frequency']);
    }

    observedActions() {
        throw Error (' Not implemented yet');
    }

    simulate() {
        this.interval = setInterval(async () => {
            if (this.localParams['propName'] === "consumption"){
                this.updatingMeasurement(randomFloat(0,1), "conductivity");
            }else {
                this.updatingMeasurement(randomFloat(0,1), "absorbance");
            }
            this.updatingMeasurement(randomFloat(0,4), "ph");
            this.updatingMeasurement(randomFloat(0,44), "turbidity");
            this.updatingMeasurement(randomFloat(0,44), "redox");
            this.updatingMeasurement(randomFloat(0,12), "dissolved_oxigen");
            this.updatingMeasurement(randomFloat(0,12), "organic_matter");
            this.updatingMeasurement(randomFloat(19,35), "temperature");
            this.updatingMeasurement(randomFloat(0,12), "absorbance_254");

        }, this.localParams['frequency']);
    }

    stop() {
        clearInterval(this.interval);
        this.ws.close();
        this.logger.log(`${this.localParams['deviceId']} plugin stopped!`);
    }

}

async function main (){
    dotenv.config();
    const logger = new Logger ('aquabio-plugin.ts');


    try {
        logger.log(`Getting Credentials...`);
        logger.log(`${process.env.ROOT_URL}/auth/login`);
        const userLogin = await axios.post(`${process.env.ROOT_URL}/auth/login`, {
            username: process.env.APP_ADMIN_USER,
            password: process.env.APP_ADMIN_PASS
        });

        logger.log(`Starting Aqua-Bio Plugin with Id ${process.argv[2]}...`);
        const aq = new AquabioGateway(
            userLogin.data.access_token,
            {'simulate': false, 'frequency': 360000, 'deviceId': process.argv[2], 'propName': ['conductivity',
                    'absorbance',
                    'ph',
                    'turbidity',
                    'redox',
                    'dissolved_oxigen',
                    'organic_matter',
                    'temperature',
                    'absorbance_254']}
        );

        if (process.argv[3] === 'HISTORIC'){
            const origin = moment('01/05/2020 00:00:00', "DD/MM/YYYY hh:mm:ss").format('YYYYMMDDHHmmss');
            const end = moment(new Date()).format('YYYYMMDDHHmmss');
            await aq.historicValues(origin, end);
        }

        await aq.start();

        process.on('SIGINT', () => {
            aq.stop();
        })
    }catch(error){
        throw error;
    }
}

main ();