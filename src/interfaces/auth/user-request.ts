export interface CreateUserRequest {
  // id: number;
  name: String;
  email: String;
  author: number;
}

// export interface GetAccountTokenRequest {
//   id: number;
// }

// export interface GetUserInfoRequest {
//   id: number;
//   title: String;
//   price: number;
//   author: number;
// }

export interface GetUserRequest {
  id: number;
  name: String;
  email: String;
}

export interface UpdateUserRequest {
  id: number;
  title: string;
}
