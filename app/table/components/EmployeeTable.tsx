"use client"
import { Employee, EmployeeAttribute } from "@/app/types"
import DataTable from "./DataTable"
import { generateColumns } from "./columns"
import { ColumnDef } from "@tanstack/react-table"

interface Props {
  employees: Employee[]
  attributes: EmployeeAttribute[]
}

export const EmployeeTable = ({ employees, attributes }: Props) => {
  return (
    <DataTable<Employee>
      data={employees}
      columns={generateColumns(attributes) as ColumnDef<Employee>[]}
    />
  )
}
