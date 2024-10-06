import dayjs from 'dayjs'
import { create } from 'zustand'

const appStore = create<{
  selectedDate: dayjs.Dayjs
  setSelectedDate: (date: dayjs.Dayjs) => void
}>((set) => ({
  selectedDate: dayjs().startOf('day'),
  setSelectedDate: (date) => set({ selectedDate: date }),
}))

const useSelectedDate = () => {
  const { selectedDate, setSelectedDate } = appStore()
  return { selectedDate, setSelectedDate }
}

export { useSelectedDate }
