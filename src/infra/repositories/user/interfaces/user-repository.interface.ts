import { GenericepositoryInterface } from '@infra/repositories/shared';

export interface UserRepositoryInterface<UserPersistence, ORM>
  extends GenericepositoryInterface<UserPersistence> {
  methods: () => ORM;
}
