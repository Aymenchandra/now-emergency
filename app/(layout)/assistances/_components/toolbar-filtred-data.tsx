import { emergencyStatus, emergencyType } from "@prisma/client";

export const status = [
  {
    value: emergencyStatus.HELP,
    label: "help"
  },
  {
    value: emergencyStatus.PENDING,
    label: "pending"
  },
  {
    value: emergencyStatus.DONE,
    label: "done"
  },
];

export const type = [
  {
    value: emergencyType.VIOLENCE,
    label: "violence"
  },
  {
    value: emergencyType.FIRE,
    label: "fire"
  },
  {
    value: emergencyType.OTHER,
    label: "other"
  },
];