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
import { ArticleStatusEnum } from 'src/shared/enums';

export class ArticleStatus {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.ENUM(...Object.values(ArticleStatusEnum)),
    allowNull: false,
    defaultValue: ArticleStatusEnum.draft,
  })
  status: (typeof ArticleStatusEnum)[keyof typeof ArticleStatusEnum];
}
