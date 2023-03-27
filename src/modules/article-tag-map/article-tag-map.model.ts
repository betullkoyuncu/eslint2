import { Model } from 'sequelize';
import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { ArticleModel } from '../article/article.model';
import { TagModel } from '../tag/tag.model';

@Table({
  tableName: 'article_tag_map',
})
export class ArticleTagMapModel extends Model {
  @ForeignKey(() => ArticleModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  articleId: number;

  @ForeignKey(() => TagModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  tagId: number;
}
