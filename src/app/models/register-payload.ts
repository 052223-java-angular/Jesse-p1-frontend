/**
 * This is used for registering a user to the backend. Will be the same as the request in the backend
 */
export interface RegisterPayload{
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
