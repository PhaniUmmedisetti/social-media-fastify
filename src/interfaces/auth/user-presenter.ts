import { User } from 'domain/entities/user';
import { UseCasePresenter } from 'interfaces/common/uc-presenter';

export interface UserPresenter<ResponseType>
  extends UseCasePresenter<ResponseType> {
  showUsers(users: User[], totalUsers: number): ResponseType;
  // showProfileInfo(userProfile: User): ResponseType;
  // created(profileData: User & AccessToken): ResponseType;
  // deleted(id: number): ResponseType;
  // updated(id: number): ResponseType;
  // getAccountToken(accessToken : AccessToken) : ResponseType;
}
