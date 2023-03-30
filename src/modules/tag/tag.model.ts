import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ArticleTagMapModel } from '../article-tag-map/article-tag-map.model';
import { ArticleModel } from '../article/article.model';

@Table({
  tableName: 'tags',
})
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

  @BelongsToMany(() => ArticleModel, () => ArticleTagMapModel)
  articles: ArticleModel[];
}
