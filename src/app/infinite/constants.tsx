"use client";

import { cn } from "@/lib/utils";
import { type ColumnSchema } from "./schema";
import type {
  DataTableFilterField,
  Option,
} from "@/components/data-table/types";
import { getStatusColor } from "@/lib/request/status-code";
import { METHODS } from "@/constants/method";
import { REGIONS } from "@/constants/region";
import { GPU, STATUS } from "@/constants/run-data-enum";

export const filterFields = [
  {
    label: "Time Range",
    value: "created_at",
    type: "timerange",
    defaultOpen: true,
    commandDisabled: true,
  },
  {
    label: "GPU",
    value: "gpu",
    type: "checkbox",
    options: GPU.map((gpu) => ({ label: gpu, value: gpu })),
  },
  {
    label: "Status",
    value: "status",
    type: "checkbox",
    options: STATUS.map((status) => ({ label: status, value: status })),
  },
] satisfies DataTableFilterField<ColumnSchema>[];
