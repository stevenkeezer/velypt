import { ActivityPhoto, Photo, Profile } from "../../models/profile";

export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees: Profile[];
  isDraft: boolean;
  activityPhotos: ActivityPhoto[];
}

export class Activity implements Activity {
  image: string;
  constructor(init?: ActivityFormValues) {
    Object.assign(this, init);
  }
}

export class ActivityFormValues {
  id?: string;
  title: string = "";
  category: string = "";
  description: string = "";
  date?: Date | null;
  city: string = "";
  venue: string = "";
  isDraft: boolean;

  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.city = activity.city;
      this.venue = activity.venue;
      this.isDraft = activity.isDraft;
    }
  }
}
