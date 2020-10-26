import { Container } from "inversify";
import {
  FeatureService,
  UserService,
  EventService,
  SendEmailService,
} from "./services";
import { AuthService } from "./services/auth.service";
import {
  UserRepository,
  FeatureRepository,
  EventRepository,
} from "./repositories";
import {
  FeatureController,
  AuthController,
  UserController,
  EventController,
} from "./controllers";
import { JwtHelper, Controller, HashEncrypter } from "./common";

export const diContainer = new Container();

diContainer.bind<JwtHelper>(JwtHelper).toSelf();
diContainer.bind<HashEncrypter>(HashEncrypter).toSelf();

diContainer.bind<UserRepository>(UserRepository).toSelf();
diContainer.bind<FeatureRepository>(FeatureRepository).toSelf();
diContainer.bind<EventRepository>(EventRepository).toSelf();

diContainer.bind<FeatureService>(FeatureService).toSelf();
diContainer.bind<AuthService>(AuthService).toSelf();
diContainer.bind<UserService>(UserService).toSelf();
diContainer.bind<EventService>(EventService).toSelf();
diContainer.bind<SendEmailService>(SendEmailService).toSelf();

diContainer.bind<Controller>("Controller").to(FeatureController);
diContainer.bind<Controller>("Controller").to(AuthController);
diContainer.bind<Controller>("Controller").to(UserController);
diContainer.bind<Controller>("Controller").to(EventController);
