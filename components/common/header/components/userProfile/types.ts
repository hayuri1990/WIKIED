export interface UserProfileProps {
  mobileMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deskMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mobileMenuBtnRef?: React.RefObject<HTMLButtonElement>;
  deskMenuBtnRef?: React.RefObject<HTMLButtonElement>;
}
