import {
  CircularProgress,
  Grow,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useBrowserStorage } from '../../../hooks/useBrowserStorage'
import { EmailOutlined } from '@mui/icons-material'
import CodeClimbersButton from '../../common/CodeClimbersButton'

const TIMEOUT = 1_000 * 60
const CLOUDFLARE_ERROR = 'Failed to fetch'
export const NewsletterForm = () => {
  const [submitTimestamp, setTimeoutTimestamp] = useBrowserStorage({
    key: 'loops-form-timestamp',
    value: null as number | null,
  })

  const subscribe = useMutation({
    mutationFn: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const currentTime = new Date().getTime()

      if (submitTimestamp && currentTime - submitTimestamp < TIMEOUT) {
        throw new Error('Please wait a moment before trying again.')
      }

      const email = (event.target as HTMLFormElement).email.value

      const res = await fetch(
        'https://app.loops.so/api/newsletter-form/cly98a0gz012h67csz8kmv7js',
        {
          method: 'POST',
          body: `userGroup=&mailingLists=clyqkcfap000m0mjqdltq61s7%2Cclz4c52l500hi0mlf5sjk7q7w&email=${encodeURIComponent(
            email,
          )}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      setTimeoutTimestamp(currentTime)

      const data = await res.json()
      if (!res.ok) {
        if (data.message === CLOUDFLARE_ERROR) {
          throw new Error('Please wait a moment before trying again.')
        }

        throw new Error(data.message ? data.message : res.statusText)
      }

      return data
    },
  })

  return (
    <Stack spacing={2}>
      <Typography variant="body2">Get Product Updates</Typography>
      <Typography variant="caption">
        Subscribe to our newsletter to get updates on new features and releases.
      </Typography>
      <Stack component="form" spacing={1} onSubmit={subscribe.mutate}>
        <TextField
          variant="outlined"
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          required
          size="small"
          helperText={subscribe.isError && subscribe.error.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />
        <CodeClimbersButton
          eventName="newsletter_form_submit"
          type="submit"
          color="primary"
          variant="outlined"
          disabled={subscribe.isPending || subscribe.isError}
          startIcon={subscribe.isPending && <CircularProgress size="1rem" />}
        >
          {subscribe.isPending ? 'Please wait...' : 'Join Waitlist'}
        </CodeClimbersButton>
        <Grow in={subscribe.isSuccess} unmountOnExit>
          <Typography variant="caption">
            Thanks for subscribing! We'll keep you updated.
          </Typography>
        </Grow>
      </Stack>
    </Stack>
  )
}
