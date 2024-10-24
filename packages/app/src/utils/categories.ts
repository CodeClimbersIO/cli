import { Theme } from '@mui/material'

export const categories = {
  coding: 'coding',
  browsing: 'browsing',
  debugging: 'debugging',
  communicating: 'communicating',
  designing: 'designing',
}

export const simplifiedCategories = {
  coding: 'coding',
  browsing: 'browsing',
  communicating: 'communicating',
  designing: 'designing',
}

export const typeColors = (theme: Theme) => [
  {
    type: 'code',
    category: 'coding',
    color: theme.palette.graphColors.blue,
  },
  {
    type: 'design',
    category: 'designing',
    color: theme.palette.graphColors.orange,
  },
  {
    type: 'communication',
    category: 'communicating',
    color: theme.palette.graphColors.purple,
  },
  {
    type: 'web',
    category: 'browsing',
    color: theme.palette.graphColors.green,
  },
  {
    type: 'misc',
    category: 'browsing',
    color: theme.palette.graphColors.green,
  },
]
