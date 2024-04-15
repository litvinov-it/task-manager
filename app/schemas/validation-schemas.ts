import { z } from "zod";
import { ERROR_ISSUE_SCHEME } from "@/app/schemas/error-schemas";

// ISSUE валидация
export const IssueScheme = z.object({

  userId: z.number(ERROR_ISSUE_SCHEME.USER_ID.number),

  title: z
    .string({
      required_error: ERROR_ISSUE_SCHEME.TITLE.required_error,
      invalid_type_error: ERROR_ISSUE_SCHEME.TITLE.invalid_type_error,
    })
    .min(1, ERROR_ISSUE_SCHEME.TITLE.min)
    .max(255, ERROR_ISSUE_SCHEME.TITLE.max),

  description: z
    .string({
      required_error: ERROR_ISSUE_SCHEME.DESCRIPTION.required_error,
      invalid_type_error: ERROR_ISSUE_SCHEME.DESCRIPTION.invalid_type_error,
    })
    .min(1, ERROR_ISSUE_SCHEME.DESCRIPTION.min),
    
});

export interface IIssue {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export type IIssueForm = z.infer<typeof IssueScheme>;

// USER валидация
export const userScheme = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});