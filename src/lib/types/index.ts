import { CloudinaryUploadWidgetResults } from "next-cloudinary";

export type TResponse = {
  object: {};
  status: number;
  headers?: any;
};

export type TPromotionLink = {
  children: React.ReactNode;
  href: string;
  className: string;
};

export type TCarMakeModelCard = {
  make: string;
  model: string;
  miniCardPhoto: string;
};

export type TCarInfo = {
  _id: string;
  name: string;
  make: string;
  model: string;
  photo: string;
  price: number;
  miniCardPhoto: string;
  year?: number;
  version?: string;
  adminId: string;
};

export type TCarCard = {
  photo: string;
  make: string;
  model: string;
  year: number;
  price: number;
  version: string;
  href?: string;
  onClick?: () => void;
};

export type TFormInput = {
  label?: string;
  id: string;
  name: string;
  type: string;
  placeholder: string | undefined;
  autoComplete?: string;
  value?: string;
  onFocus: () => void;
  onBlur: () => void;
  hidden?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TFormSelect = {
  id: string;
  name: string;
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  families: TCarFamily[];
};

export type TImageUpload = {
  photo: string;
  alt: string;
  publicId: string;
  handleImageUpload: (result: CloudinaryUploadWidgetResults) => void;
  removeImage: (event: React.FormEvent) => void;
};

export type TSubmitButton = {
  disabled?: boolean;
  buttonType: "submit" | "reset" | "button" | undefined;
  buttonText: string;
  extraStyle?: string;
};

export type TCarForm = {
  initialFormInfo: {
    name: string;
    make: string;
    model: string;
    photo: string;
    familyId: string;
    price: string;
    year: string;
    version: string;
  };
  submitHandler: (formInfo: any) => Promise<void>;
  submitButtonText: string;
  params?: { id: string };
};

export type TUser = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TCarFamily = {
  _id: string;
  name: string;
  make: string;
  model: string;
};
