import { ChangeEvent } from "react";

export interface InputInterface {
  inputItems: InputItems[];
}

export interface InputItems {
  type: string;
  placeholder?: string;
  name: string;
  value?: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  errorMsg?: string;
  pattern: string;
}
