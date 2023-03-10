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
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { literal } from 'sequelize';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { UserRelationship } from '../user-relationship/relationship.entity';
import { Article } from '../article/article.entity';
import { ArticleBookmark } from 'src/modules/article-bookmark/article-bookmark.entity';
import { v4 } from 'uuid';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @IsEmail
  @Column({
    type: DataType.STRING(255),
    unique: 'email',
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(50),
    unique: 'slug',
    allowNull: false,
  })
  slug: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  salt: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    field: 'hash',
  })
  hash: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    field: 'profile',
  })
  profile: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'icon',
  })
  icon: string | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'background_pic',
  })
  backgroundPic: string | null;

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

  @Column({
    type: DataType.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'pwd_modified_at',
  })
  pwdModifiedAt: Date;

  /** custom hooks */

  /** custom functions */
  setPassword(password: string) {
    const salt = randomBytes(16);
    const hash = pbkdf2Sync(password, salt, 1_000, 64, 'sha256');

    this.salt = salt.toString('hex');
    this.hash = hash.toString('hex');
  }

  generateSlug() {
    this.slug = v4();
  }

  validatePassword(password: string) {
    const hash = pbkdf2Sync(password, this.salt, 1_000, 64, 'sha256');
    return this.hash === hash.toString('hex');
  }

  toAuthJSON() {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      icon: this.icon,
      backgroundPic: this.backgroundPic,
      profile: this.profile,
    };
  }

  @HasMany(() => UserRelationship)
  followers: UserRelationship[];

  @HasMany(() => UserRelationship)
  followings: UserRelationship[];

  @BelongsToMany(() => Article, () => ArticleBookmark)
  bookmarked: Article[];
}
