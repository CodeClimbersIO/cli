import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { useLatestPulses } from '../../api/pulse.api'

export const LatestPulsesComponent = () => {
  const {
    data: pulses,
    isPending,
    isEmpty,
    isError,
    refetch,
  } = useLatestPulses()

  useEffect(() => {
    const handleFocus = () => {
      refetch()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  console.log(isPending, pulses)
  if (isPending) return <CircularProgress />
  console.log(isError)
  return (
    <div>
      <h2>Latest Pulses</h2>
      {isError && <div>Failed to fetch pulses</div>}
      {isEmpty && <div>No pulses found</div>}
      {pulses &&
        pulses.map((pulse) => (
          <div key={pulse.id}>
            <h3>{pulse.time}</h3>
            <p>{pulse.entity}</p>
          </div>
        ))}
    </div>
  )
}
