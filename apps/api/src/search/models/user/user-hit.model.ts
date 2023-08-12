import { Field, ObjectType } from '@nestjs/graphql';
import { Hit } from '../common/hit.model';
import { User } from '@/users/models/user.model';

@ObjectType()
export class UserHit extends Hit {
  @Field(() => User)
  _source!: User;
}
