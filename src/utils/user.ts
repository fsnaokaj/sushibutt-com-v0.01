import { RoleId, User } from "@/types"

export const LIST_ROLES: RoleId[] = ["founder", "brand"]

export function canList(user: User | null | undefined) {
  return !!user?.roles.some((r) => LIST_ROLES.includes(r))
}

export function toggleItem<T>(list: T[], item: T) {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
}
