import { useEffect, useState } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Check, ContentCopy } from '@mui/icons-material'
import CodeClimbersIconButton from '../CodeClimbersIconButton'

const timers: NodeJS.Timeout[] = []

export type CodeSnippitProps = {
  code: string
  onCopy?: () => void
}

export const CodeSnippit = ({ code, onCopy }: CodeSnippitProps) => {
  const [coppied, setCoppied] = useState(false)
  const [errored, setErrored] = useState(false)

  const handleTimer = (action: () => void) => {
    timers.push(
      setTimeout(() => {
        action()
      }, 2_000),
    )
  }

  useEffect(() => {
    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  const copyToClipboard = () => {
    if (errored || coppied) return
    if (onCopy) onCopy()
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCoppied(true)
        handleTimer(() => {
          setCoppied(false)
        })
      })
      .catch(() => {
        setErrored(true)
        handleTimer(() => {
          setErrored(false)
        })
      })
  }

  const Icon = errored ? Error : coppied ? Check : ContentCopy

  return (
    <Grid2
      container
      sx={{
        alignItems: 'center',
        flexWrap: 'nowrap',
      }}
    >
      <Grid2>
        <CodeClimbersIconButton
          size="small"
          onClick={copyToClipboard}
          eventName="code_snippit_copy_click"
        >
          <Icon fontSize="small" />
        </CodeClimbersIconButton>
        <Grid2 component="code" fontSize="12px">
          {code}
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
