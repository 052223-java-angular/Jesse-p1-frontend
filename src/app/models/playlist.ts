import {Song} from "./song";

export interface Playlist {
  id: string;
  title: string;
  description: string;
  songs: Song[];
}
