import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Seeder } from './seeder';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import MongoMemoryServer from 'mongodb-memory-server-core';
import axios from 'axios';
import {Logger} from "@nestjs/common";
import {readExcelToJSON, registerThings} from "./utils/plugins-utils";
import {AquabioGateway} from "./plugins/aquabio-gateway";
import {WsAdapter} from "@nestjs/platform-ws";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {SmartMeterC13FA445923} from "./plugins/smartMeter_C13FA445923";
import * as path from "path";
import {SmartMeterArrahona} from "./plugins/smartMeterArrahona";

async function bootstrap() {

  const logger = new Logger ('Main.ts');


  // Run with in-memory Mongo
  if (process.env.INMEMORY_MONGODB === 'true') {
    const mongod = new MongoMemoryServer();
    process.env.MONGODB_URI = await mongod.getUri();
  }

  const options = new DocumentBuilder()
      .setTitle('IMAQUA Semantic Sensor Hub')
      .setDescription('The open documentation shows the interaction with the IMAQUA Things and systems')
      .setVersion('1.0')
      .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'access_token',
      )
      .build();

  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.enableCors({
    'origin': configService.get('ORIGIN', '*').split(','),
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204
  });

  const seeder = app.get(Seeder);
  await seeder.seed();
  await app.listen(configService.get('PORT', 3000));

  logger.log(`Requesting user at: ${`${process.env.ROOT_URL}/auth/login`}`)

  try {
    const userLogin = await axios.post(`${process.env.ROOT_URL}/auth/login`, {
      username: process.env.APP_ADMIN_USER,
      password: process.env.APP_ADMIN_PASS
    });

    logger.log(`Loading all Things...`);
    const status = await registerThings(userLogin.data.access_token);

    if (!status) process.exit();

    /*logger.log(`Starting Sabadell Smart Meter C13FA445923...`);
    const smartMeter = new SmartMeterC13FA445923(
        userLogin.data.access_token,
        {'simulate': false, 'frequency': 3000, 'deviceId': 'sabadell-C13FA445923', 'propName': 'consumption'}
    );
    await smartMeter.start();

    logger.log(`Starting Arrahona Smart Meter for Chlorine`);
    const ArrahonaSM = new SmartMeterArrahona(
        userLogin.data.access_token,
        {'simulate': false, 'frequency': 3000, 'deviceId': 'sabadell-Arrahona', 'propName': 'chlorine'}
    )
     await ArrahonaSM.start();

    /*logger.log(`Starting Risk-Model Plugin...`);

    const riskModel = new RiskModelGateway(
        userLogin.data.access_token,
        {'simulate': true, 'frequency': 3000, 'deviceId': 'risk-model', 'propName': ['waterQuality', 'ecoliConcentration']}
        );
    await riskModel.start();*/

    /*logger.log(`Starting Aqua-Bio Plugin...`);
    const aquaBio = new AquabioGateway(
        userLogin.data.access_token,
        {'simulate': false, 'frequency': 360000, 'deviceId': 'aqua-Bio-9', 'propName': ['conductivity',
            'absorbance',
            'ph',
            'turbidity',
            'redox',
            'dissolved_oxigen',
            'organic_matter',
            'temperature',
            'absorbance_254']}
    ).start()*/


  } catch(error){
    throw error;
  }

}
bootstrap();
