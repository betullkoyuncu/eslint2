import { pbkdf2Sync, randomBytes } from 'crypto';
import { literal } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id: number;

  @Index
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: 'slug',
  })
  slug: string;

  @Index
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: 'email',
  })
  email: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
  })
  slat: string;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
  })
  hash: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    onUpdate: String(literal('CURRENT_TIMESTAMP')),
    field: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
  })
  nickname?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  icon?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    field: 'background_image',
  })
  backgroundImage?: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  profile?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'password_changed_at',
  })
  passwordChangedAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'last_force_logout_at',
  })
  lastForceLogoutAt?: Date;

  /**
   * custom function
   */
  setPassword(password: string) {
    const slat = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, slat, 1_000, 64, 'sha256').toString(
      'hex',
    );
    this.slat = slat;
    this.hash = hash;
    return {
      slat,
      hash,
    };
  }

  setSlug() {
    this.slug = uuidv4();
  }

  validatePassword(password: string) {
    const hash = pbkdf2Sync(password, this.slat, 1_000, 64, 'sha256').toString(
      'hex',
    );
    return this.hash === hash;
  }

  toAuthJson() {
    return {
      id: this.id,
      nickname: this.nickname,
      email: this.email,
      icon: this.icon,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastForceLogout: this.lastForceLogoutAt,
      passwordChangedAt: this.passwordChangedAt,
    };
  }

  toPublicJson() {
    return {
      id: this.id,
      nickname: this.nickname,
      icon: this.icon,
      createdAt: this.createdAt,
    };
  }
}
