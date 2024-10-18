export type Employee = {
  id: number
  attributes: EmployeeAttributeValue[]
}

export type EmployeeAttribute = {
  id: string
  name: string
  require: boolean
  type: string
  order: number
}

export type EmployeeAttributeValue = {
  attributeId: string
  attributeValue: string
  attributeName: string
}

