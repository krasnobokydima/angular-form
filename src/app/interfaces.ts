export type Libraries = 'Angular' | 'React' | 'Vue';

export type Versions = string[];

export interface LibVersions {
  [key: string]: Versions;
}

export interface Hobby {
  hobby: string;
  duration: number;
}

export type Frameworks = string[];
