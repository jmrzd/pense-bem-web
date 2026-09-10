import { useMemo } from 'react'
import { getDashboardStats } from '../services/dashboardService'

export function useDashboard() {
  return useMemo(() => getDashboardStats(), [])
}
