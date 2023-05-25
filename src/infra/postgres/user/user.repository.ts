import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user';

export class UserRepository {
  private connection: DataSource;
  private repository: Repository<User>;

  constructor(connection: DataSource) {
    this.connection = connection;
    this.repository = connection.getRepository(User);
    console.log('this repo', this.repository.createQueryBuilder());
  }
  //for creating a new User
  public async save(User: User): Promise<User> {
    const newUser = await this.repository.save(User);
    return newUser;
  }

  async getAllUsers({
    limit,
    offset,
  }: { limit?: number; offset?: number } = {}): Promise<User[]> {
    console.log('repo get fired');
    let query = this.repository.createQueryBuilder();
    console.log('after query init');
    if (offset) query = query.skip(offset);
    if (limit) query = query.take(limit);
    query = query.orderBy('id');
    console.log('query', query);
    const Users = await query.getMany();
    console.log('All Users' + Users);
    return Users;
  }
}
