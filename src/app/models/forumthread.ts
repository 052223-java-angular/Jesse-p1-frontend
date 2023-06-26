import {forumcomment} from "./forumcomment";
import {User} from "./user";

export interface Forumthread {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  username:string;
  user:User;
  forumComments: forumcomment[];
}

