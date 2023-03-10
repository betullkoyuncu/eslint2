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
import { Article } from '../article/article.entity';
import { User } from '../user/user.entity';

@Table({
  tableName: 'article_bookmark',
})
export class ArticleBookmark extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  userId: number;

  @PrimaryKey
  @ForeignKey(() => Article)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  articleId: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  })
  createdAt: Date;
}
