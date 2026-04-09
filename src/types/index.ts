import { User } from "firebase/auth";

export type FieldType = "text" | "textarea" | "date" | "email";

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: FieldType;
  required?: boolean;
}

export interface DocumentType {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: FormField[];
  placeholder: string;
}

export type AppStep = "landing" | "select" | "form" | "preview" | "history";

export interface HistoryDocument {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: any;
  userId: string;
}
