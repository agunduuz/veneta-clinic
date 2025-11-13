// lib/operations.ts
import {
  trOperations,
  enOperations,
  type OperationData,
} from "@/data/operations";

export function getOperationData(
  category: string,
  locale: "tr" | "en"
): OperationData | undefined {
  const operations = locale === "en" ? enOperations : trOperations;
  return operations[category];
}
