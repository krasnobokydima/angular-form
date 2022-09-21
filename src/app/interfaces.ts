export type Libraries = 'Angular' | 'React' | 'Vue';
export interface ILibVersions {
  [key: string]: string[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  framework: string;
  frameworkVersion: string;
  email: string;

  hobbies: IHobby[];
}

export interface IHobby {
  hobby: string;
  duration: number;
}

export type Frameworks = string[];
