export interface IActionResponse<T> {
   code: number;
   message: string;
   Description?: string;
   data?: T;
   success?: boolean;
   errors?: {
      [key: string]: string;
   }[];
}
