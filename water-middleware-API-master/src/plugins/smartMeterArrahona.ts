import {CorePlugin} from "./core-plugin";
import {randomFloat, readExcelToJSON} from "../utils/plugins-utils";
import axios from "axios";
import {NotFoundException} from "@nestjs/common";

export class SmartMeterArrahona extends CorePlugin {

    constructor(token: string, params: object) {
        super(token, params);
    }

    async connectHardware() {
        this.logger.log('getting information from the Excel file');
        const response = await axios.get(`${process.env.ROOT_URL}/things/${this.localParams["deviceId"]}`);
        if (response.status !== 200) throw new NotFoundException(`The Device measurement cannot be updated`);
        const values = await readExcelToJSON(response.data.links[0].href);
        console.log(values)
        values.forEach(item => {
            const itemValue = item.VALUE.replace(',', '.');
            this.updatingMeasurement(itemValue, this.localParams['propName'], item.DATE, 'YYYY-MM-DD hh:mm:ss.SSS')
        });
    }

    observedActions() {
        throw Error(' Not implemented yet');
    }

    simulate() {
        this.interval = setInterval(async () => {
            this.updatingMeasurement(randomFloat(20000, 23000), this.localParams['propName']);
        }, this.localParams['frequency']);
    }

    stop() {
        clearInterval(this.interval);
        this.logger.log(`${this.localParams['deviceId']} plugin stopped!`);
    }
}

