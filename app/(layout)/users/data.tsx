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

// export const incomeType = [
//   {
//     label: "Income",
//     value: "income",
//     icon: ArrowUpIcon
//   },
//   {
//     label: "Expense",
//     value: "expense",
//     icon: ArrowDownIcon
//   }
// ];