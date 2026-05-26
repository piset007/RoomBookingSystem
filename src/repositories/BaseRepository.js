/**
 * BaseRepository - Abstract data access layer
 * Handles common CRUD operations for all models
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async findOne(where) {
    return this.model.findOne({ where });
  }

  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  async update(id, data) {
    const record = await this.findById(id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    return record.update(data);
  }

  async delete(id) {
    const record = await this.findById(id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    return record.destroy();
  }

  async count(where = {}) {
    return this.model.count({ where });
  }

  async paginate(page = 1, limit = 10, where = {}) {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.model.findAndCountAll({
      where,
      offset,
      limit,
    });
    return {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit),
      data: rows,
    };
  }
}

module.exports = BaseRepository;
