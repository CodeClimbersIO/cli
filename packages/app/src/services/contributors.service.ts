interface Contributor {
  name: string
  subTitle: string
  profileUrl: string
  shouldSpotlight?: boolean
}

const baseFirebaseUrl =
  'https://firebasestorage.googleapis.com/v0/b/codeclimbersio.appspot.com/o/public%2Fcontributors%2F'
const getContributors = (): Contributor[] => {
  return [
    {
      name: 'Björn Büttner = Bjoern Buettner',
      subTitle: 'Favorite Villain: Ondolemar',
      profileUrl: `${baseFirebaseUrl}idrinth.jpeg?alt=media`,
      shouldSpotlight: true,
    },
    {
      name: 'Charles Uthulor',
      subTitle: 'Favorite Game: Last of Us 2',
      profileUrl: `${baseFirebaseUrl}charles.jpeg?alt=media`,
      shouldSpotlight: true,
    },
    {
      name: 'Dani',
      subTitle: 'Favorite Game: Stardew Valley',
      profileUrl: `${baseFirebaseUrl}danz.jpeg?alt=media`,
      shouldSpotlight: true,
    },
    {
      name: 'Evan',
      subTitle: 'uses vim btw',
      profileUrl: `${baseFirebaseUrl}evan.jpeg?alt=media`,
      shouldSpotlight: true,
    },
    {
      name: 'Shone',
      subTitle:
        'Bugs, beats, and the Force-programming, mixing, and mastering the ways of the Jedi.',
      profileUrl: `${baseFirebaseUrl}nvajagic.png?alt=media`,
      shouldSpotlight: true,
    },
    {
      name: 'Tanner Scadden',
      subTitle: 'Favorite Villain: Bowser',
      profileUrl: `${baseFirebaseUrl}tanner.jpeg?alt=media`,
      shouldSpotlight: true,
    },
    {
      name: 'Jacob Crockett',
      subTitle: 'Favorite animal: Killer whale; Favorite Villain: Loki',
      profileUrl: `${baseFirebaseUrl}crockett.png?alt=media`,
      shouldSpotlight: true,
    },
    {
      name: 'Paul Hovley',
      subTitle: 'Tortured fan of the Utah Jazz 🏀',
      profileUrl: `${baseFirebaseUrl}paul.jpeg?alt=media`,
      shouldSpotlight: true,
    },
  ]
}

// get a random contributor that has shouldSpotlight set to true
const getSpotlight = (): Contributor => {
  const contributors = getContributors()
  const spotlightContributors = contributors.filter(
    (contributor) => contributor.shouldSpotlight,
  )
  return spotlightContributors[
    Math.floor(Math.random() * spotlightContributors.length)
  ]
}

export default { getSpotlight, getContributors }
