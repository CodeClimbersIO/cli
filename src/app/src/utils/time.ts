/* eslint-disable import/no-named-as-default-member */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: '1s',
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1D",
    dd: "%dD",
    M: "1M",
    MM: "%dM",
    y: "1Y",
    yy: "%dY"
  }
})


export function getTimeSince(utcDateString: string): string{
    return dayjs(utcDateString).fromNow(true)
}
