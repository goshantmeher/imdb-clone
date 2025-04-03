export interface IActionResponse<T> {
   code: number;
   message: string;
   Description?: string;
   data?: T;
   errors?: {
      [key: string]: string;
   }[];
}
