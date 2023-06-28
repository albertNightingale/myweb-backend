export interface Project {
  onGoing: boolean;
  projectName: string;
  startingDate: string;
  endingDate?: string;
  website?: string;
  github?: string;
  stack: string[];
  description: string;
}