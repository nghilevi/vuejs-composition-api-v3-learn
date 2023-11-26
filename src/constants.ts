export const periods = ["Today", "This week", "This month"] as const
// w/o as const, periods is gonna be dynamic
export type Period = typeof periods[number]