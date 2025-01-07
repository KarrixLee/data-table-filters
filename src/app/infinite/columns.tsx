"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Check, Minus, X } from "lucide-react";
import type { ColumnSchema } from "./schema";
import { format, formatDistanceToNow } from "date-fns";
import { getStatusColor } from "@/lib/request/status-code";
import { regions } from "@/constants/region";
import {
  getTimingColor,
  getTimingLabel,
  getTimingPercentage,
  timingPhases,
} from "@/lib/request/timing";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import TextWithTooltip from "@/components/custom/text-with-tooltip";
import { UTCDate } from "@date-fns/utc";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const columns: ColumnDef<ColumnSchema>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const value = row.getValue("id") as string;
      return (
        <TextWithTooltip
          className="font-mono text-xs max-w-[85px]"
          text={value}
        />
      );
    },
    meta: {
      label: "ID",
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <div className="whitespace-nowrap">
              {formatDistanceToNow(date, { addSuffix: true })}
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            side="right"
            align="start"
            alignOffset={-4}
            className="p-2 w-auto z-10"
          >
            <dl className="flex flex-col gap-1">
              <div className="flex gap-4 text-sm justify-between items-center">
                <dt className="text-muted-foreground">Timestamp</dt>
                <dd className="font-mono truncate">{date.getTime()}</dd>
              </div>
              <div className="flex gap-4 text-sm justify-between items-center">
                <dt className="text-muted-foreground">UTC</dt>
                <dd className="font-mono truncate">
                  {format(new UTCDate(date), "LLL dd, y HH:mm:ss")}
                </dd>
              </div>
              <div className="flex gap-4 text-sm justify-between items-center">
                <dt className="text-muted-foreground">{timezone}</dt>
                <dd className="font-mono truncate">
                  {format(date, "LLL dd, y HH:mm:ss")}
                </dd>
              </div>
            </dl>
          </HoverCardContent>
        </HoverCard>
      );
    },
    filterFn: "inDateRange",
    meta: {
      // headerClassName: "w-[182px]",
    },
  },
  {
    accessorKey: "gpu",
    header: "GPU",
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const value = row.getValue("gpu") as string;
      return <TextWithTooltip className="max-w-[120px]" text={value} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const value = row.getValue("status") as string;
      return <TextWithTooltip className="max-w-[120px]" text={value} />;
    },
  },
  {
    accessorKey: "origin",
    header: "Origin",
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const value = row.getValue("origin") as string;
      return <TextWithTooltip className="max-w-[120px]" text={value} />;
    },
  },
  {
    accessorKey: "workflow name",
    header: "Workflow Name",
    accessorFn: (row) => row.workflow?.name,
    cell: ({ row }) => {
      const value = row.getValue("workflow name") as string;
      return <TextWithTooltip className="max-w-[200px]" text={value} />;
    },
  },
  {
    accessorKey: "version",
    header: "Workflow Version",
    accessorFn: (row) => row.workflow_version,
    cell: ({ row }) => {
      const value = row.getValue("version") as string;
      return <TextWithTooltip className="max-w-[100px]" text={`v${value}`} />;
    },
  },
  {
    accessorKey: "machine",
    header: "Machine",
    accessorFn: (row) => row.machine.name,
    cell: ({ row }) => {
      const value = row.getValue("machine") as string;
      return <TextWithTooltip className="max-w-[200px]" text={value} />;
    },
  },
];
