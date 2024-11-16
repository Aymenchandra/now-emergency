import { userRole } from "@prisma/client";

export const role = [
  {
    value: userRole.USER,
    label: "user"
  },
  {
    value: userRole.ADMIN,
    label: "admin"
  },
];