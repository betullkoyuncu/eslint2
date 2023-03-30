import { literal } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '../user/user.model';

@Table({
  tableName: 'user_followings',
})
export class UserFollowingModel extends Model {
  @PrimaryKey
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId: number;

  @PrimaryKey
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  followingId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
  })
  createdAt: Date;
}
