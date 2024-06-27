import { ReactNode } from "react";

type FormWrapperProps = {
  children: ReactNode;
};

export const FormWrapper = ({ children }: FormWrapperProps) => {
  return <>{children}</>;
};
