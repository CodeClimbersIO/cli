import { useEffect, useState } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { Check, ContentCopy, Error } from '@mui/icons-material'
import { Box } from '@mui/material'
import { CodeClimbersIconButton } from '../CodeClimbersIconButton'

const timers: NodeJS.Timeout[] = []

export type CodeSnippitProps = {
  code: string
  onCopy?: () => void
}

export const CodeSnippit = ({ code, onCopy }: CodeSnippitProps) => {
  const [copied, setCopied] = useState(false)
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

  const copyToClipboard = async () => {
    if (errored || copied) return
    if (onCopy) onCopy()
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      handleTimer(() => {
        setCopied(false)
      })
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = code

      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'

      document.body.prepend(textArea)
      textArea.select()

      try {
        document.execCommand('copy')
        setCopied(true)
        handleTimer(() => {
          setCopied(false)
        })
      } catch (error) {
        setErrored(true)
        handleTimer(() => {
          setErrored(false)
        })
        console.error(error)
      } finally {
        textArea.remove()
      }
    }
  }

  // let Icon = errored ? Error : copied ? Check : ContentCopy
  let Icon = ContentCopy
  if (errored) Icon = Error
  if (copied) Icon = Check

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
          color={errored ? 'error' : 'default'}
          eventName="code_snippit_copy_click"
        >
          <Icon fontSize="small" />
        </CodeClimbersIconButton>
        <Box
          fontSize="10px"
          style={{ display: 'inline', fontFamily: 'monospace' }}
        >
          {code}
        </Box>
      </Grid2>
    </Grid2>
  )
}
