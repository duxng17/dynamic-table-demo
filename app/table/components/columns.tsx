"use client"
import { Employee, EmployeeAttribute, EmployeeAttributeValue } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { createColumnHelper } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

const columnHelper = createColumnHelper<Employee>()

export const generateColumns = (attributes: EmployeeAttribute[]) => {
  return [
    columnHelper.display({
      id: "select",
      header({ table }) {
        return <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      },
      cell({ row }) {
        return <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px] text-center"
        />
      },
    }),
    columnHelper.accessor("id", {
      id: "id",
      header({ column }) {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
            className=""
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell({ row }) {
        return row?.original?.id ?? "N/A"
      },
    }),
    ...attributes.map((attr) =>
      columnHelper.accessor((row) => row?.attributes?.find(item => item.attributeId), {
        id: attr.id,
        header({ column }) {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {attr.name}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell({ row }) {
          const items = row?.original?.attributes as EmployeeAttributeValue[]
          const item = items?.find(el => el.attributeId === attr.id)
          if (item) return item.attributeValue
          return "N/A"
        },
      })
    ),
  ]
}
