import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

export class TagModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: 'name',
  })
  name: string;
}
