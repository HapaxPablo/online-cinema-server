import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getMongoDbConfig } from './config/mongo.config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { GenreModule } from './genre/genre.module'
import { FilesModule } from './files/file.module'
import { ActorModule } from './actor/actor.module'
import { MovieModule } from './movie/movie.module'
import { RatingModule } from './rating/rating.module'
import { TelegramModule } from './telegram/telegram.module'
import { Module } from '@nestjs/common'
import * as mongoose from 'mongoose';
import mongodbConfig from './mongodb.config';


@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDbConfig,
		}),
		MovieModule,
		GenreModule,
		ActorModule,
		UserModule,
		AuthModule,
		FilesModule,
		TelegramModule,
		RatingModule,

	],
	controllers: [AppController],
	providers: [AppService], //снабжение пример: app сервисы
})
export class AppModule {
	constructor() {
		this.connectToMongoDB();
	  }
	
	  private connectToMongoDB() {
		mongoose
		  .connect(mongodbConfig.uri)
		  .then(() => {
			console.log('Connected to MongoDB');
		  })
		  .catch((error) => {
			console.error('Failed to connect to MongoDB:', error);
		  });
	  }
	  
}


