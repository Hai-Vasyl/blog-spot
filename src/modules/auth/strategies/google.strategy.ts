import { LoginGoogleUserDTO } from '@/modules/users/dto/login-google-user.dto';
import { EnvTypeEnum } from '@/shared/enums/env-type.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  public constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('google.authGoogleClientID'),
      clientSecret: configService.get('google.authGoogleSecret'),
      callbackURL:
        configService.get('common.nodeEnv') === EnvTypeEnum.DEVELOPMENT
          ? 'http://localhost:5000/users/google/redirect'
          : // TODO: to be modified in near future
            'http://localhost:5000/users/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    accessToken: string,
    // TODO: to be added as new functionality
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    console.log({ profile });

    console.log(JSON.stringify({ emails }));
    const user: LoginGoogleUserDTO = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatar: photos[0].value,
    };

    done(null, user);
  }
}
