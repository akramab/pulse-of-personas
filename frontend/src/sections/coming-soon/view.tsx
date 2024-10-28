'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { useCountdownDate } from 'src/hooks/use-countdown';

import { _socials } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';
import { ComingSoonIllustration } from 'src/assets/illustrations';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

export function ComingSoonView() {
  const countdown = useCountdownDate(new Date('2025-08-20 20:30'));

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Coming soon!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        We are currently working hard on this page!
      </Typography>

      <ComingSoonIllustration sx={{ my: { xs: 5, sm: 10 } }} />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="days" value={countdown.days} />
        <TimeBlock label="hours" value={countdown.hours} />
        <TimeBlock label="minutes" value={countdown.minutes} />
        <TimeBlock label="seconds" value={countdown.seconds} />
      </Stack>

      <Box gap={1} display="flex" justifyContent="center" sx={{ my: 5 }}>
        <Button variant="contained" size="large" href="/dashboard" color="primary">
          Return to Dashboard
        </Button>
      </Box>

      <Box gap={1} display="flex" justifyContent="center">
        {_socials.map((social) => (
          <IconButton key={social.label} color="inherit">
            {social.value === 'facebook' && <FacebookIcon />}
            {social.value === 'instagram' && <InstagramIcon />}
            {social.value === 'linkedin' && <LinkedinIcon />}
            {social.value === 'twitter' && <TwitterIcon />}
          </IconButton>
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div>
      <div> {value} </div>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
