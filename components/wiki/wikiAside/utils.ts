import { ProfileDetail } from '@/types/wiki';

export const getAttributes = (editedProfile: ProfileDetail) => [
  { name: '거주 도시', value: editedProfile.city, key: 'city' },
  { name: 'MBTI', value: editedProfile.mbti, key: 'mbti' },
  { name: '직업', value: editedProfile.job, key: 'job' },
  { name: 'SNS 계정', value: editedProfile.sns, key: 'sns' },
  { name: '생일', value: editedProfile.birthday, key: 'birthday' },
  { name: '별명', value: editedProfile.nickname, key: 'nickname' },
  { name: '혈액형', value: editedProfile.bloodType, key: 'bloodType' },
  { name: '국적', value: editedProfile.nationality, key: 'nationality' },
];
