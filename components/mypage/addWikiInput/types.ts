import { ProfileRequest } from '@/types/profile';

export interface AddWikiInputProps {
  onAddWiki: (profileData: ProfileRequest) => Promise<boolean>;
}
