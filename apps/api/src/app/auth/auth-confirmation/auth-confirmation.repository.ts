import { EntityRepository, Repository } from 'typeorm';
import { AuthConfirmationEntity } from './auth-confirmation.entity';

@EntityRepository(AuthConfirmationEntity)
export class AuthConfirmationRepository extends Repository<AuthConfirmationEntity> {}
