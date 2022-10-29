import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtDecodedPayload } from './jwt-decoded-payload';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@infra/user/entities/user.schema';
import { Model } from 'mongoose';
import { ERROR_MESSAGES } from '@shared/error-messages';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly conn: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secure_secret',
    });
  }

  async validate(payload: JwtDecodedPayload): Promise<JwtDecodedPayload> {
    const id = payload.userId;
    const userExist = await this.conn.findOne({ id });

    if (!userExist) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return { userId: payload.userId };
  }
}
