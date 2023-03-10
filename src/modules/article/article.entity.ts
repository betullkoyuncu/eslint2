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
export class Article extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  slug: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  writerId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    onUpdate: String(literal('CURRENT_TIMESTAMP')),
    field: 'updated_at',
  })
  updatedAt: Date;
}
