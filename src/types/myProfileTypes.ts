interface MyProfileData {
  title: string;
  value: string;
}

interface UserData {
  name: string;
  cnpj: string;
  birth_date: string;
  country: string;
  account_type: string;
  email: string;
}

interface ModalMyProfileProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export type { UserData, MyProfileData, ModalMyProfileProps };
