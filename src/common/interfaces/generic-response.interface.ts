export interface GenericResponse<T> {
  message: string;
  payload?: T;
}
