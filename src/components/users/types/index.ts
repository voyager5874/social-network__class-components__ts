type UserInAppType = {
  id: string;
  avatarURL: string;
  name: string;
  status: string;
  followed: boolean;
  location: LocationType;
};

export type LocationType = {
  country: string;
  city: string;
};
