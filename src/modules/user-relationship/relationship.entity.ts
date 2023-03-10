import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  Index,
  BelongsTo,
} from 'sequelize-typescript';
import { literal } from 'sequelize';
import { User } from '../user/user.entity';

@Table
export class UserRelationship extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => User)
  @Index({
    unique: false,
  })
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  followerId: number;

  @ForeignKey(() => User)
  @Index({
    unique: false,
  })
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  followingId: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  })
  createdAt: Date;
}
