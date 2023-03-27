import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { SequelizeValidationException } from 'src/exceptions/sequelize-validation/sequelize-validation.exception';
import { TagModel } from './tag.model';

@Injectable()
export class TagService {
  constructor(
    @Inject(TagModel.name) private readonly tagRepo: typeof TagModel,
  ) {}

  async createTag(name: string) {
    try {
      const tagBuild = this.tagRepo.build({ name });

      await tagBuild.validate();
      const saved = await tagBuild.save();

      return {
        id: saved.id,
        name: saved.name,
      };
    } catch (error) {
      throw new SequelizeValidationException(TagService.name, error);
    }
  }

  async findAll(ids: number[]) {
    try {
      const tags = await this.tagRepo.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
      return tags;
    } catch (error) {
      throw new SequelizeValidationException(TagService.name, error);
    }
  }
}
