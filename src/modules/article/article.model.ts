import { literal } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import { ArticleTagMapModel } from '../article-tag-map/article-tag-map.model';
import { TagModel } from '../tag/tag.model';
import { UserModel } from '../user/user.model';

@Table({
  tableName: 'articles',
  defaultScope: {
    attributes: ['id', 'content', 'createdAt', 'updatedAt'],
    include: [
      {
        model: UserModel,
        as: 'writer',
      },
    ],
  },
})
export class ArticleModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'writer_id',
  })
  writerId: number;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  })
  updatedAt: Date;

  /**
   * customer functions
   */
  setSlug() {
    this.slug = v4();
  }

  @BelongsTo(() => UserModel)
  writer: UserModel;

  @BelongsToMany(() => TagModel, () => ArticleTagMapModel)
  tags: TagModel[];
}
