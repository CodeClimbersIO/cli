interface Props {
  size?: number
}
export const IntellijIcon = ({ size = 32 }: Props) => {
  return (
    <svg fill="none" viewBox="0 0 64 64" width={size} height={size}>
      <defs>
        <linearGradient
          id="__JETBRAINS_COM__LOGO_PREFIX__2"
          x1="-0.391"
          x2="24.392"
          y1="7.671"
          y2="61.126"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="#FC801D"></stop>
          <stop offset="0.59" stopColor="#FE2857"></stop>
        </linearGradient>
        <linearGradient
          id="__JETBRAINS_COM__LOGO_PREFIX__1"
          x1="4.325"
          x2="62.921"
          y1="59.932"
          y2="1.336"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.21" stopColor="#FE2857"></stop>
          <stop offset="0.7" stopColor="#007EFF"></stop>
        </linearGradient>
      </defs>
      <path
        fill="#FF8100"
        d="M16.45 6H4.191a4.125 4.125 0 0 0-4.124 4.19l.176 11.044a4.125 4.125 0 0 0 1.44 3.066l38.159 32.707c.747.64 1.7.993 2.684.993h11.35A4.125 4.125 0 0 0 58 53.875V42.872c0-1.19-.514-2.321-1.41-3.105L19.167 7.021A4.123 4.123 0 0 0 16.45 6Z"
      ></path>
      <path
        fill="url(#__JETBRAINS_COM__LOGO_PREFIX__2)"
        d="M14.988 6H4.125A4.125 4.125 0 0 0 0 10.125v12.566c0 .2.014.4.044.598l5.448 37.185A4.125 4.125 0 0 0 9.573 64h15.398a4.125 4.125 0 0 0 4.125-4.127L29.09 41.37c0-.426-.066-.849-.195-1.254l-9.98-31.245A4.126 4.126 0 0 0 14.988 6Z"
      ></path>
      <path
        fill="url(#__JETBRAINS_COM__LOGO_PREFIX__1)"
        d="M59.876 0H25.748a4.125 4.125 0 0 0-3.8 2.52L6.151 39.943a4.118 4.118 0 0 0-.325 1.638l.15 18.329A4.125 4.125 0 0 0 10.101 64h17.666c.806 0 1.593-.236 2.266-.678l32.11-21.109A4.123 4.123 0 0 0 64 38.766V4.125A4.125 4.125 0 0 0 59.876 0Z"
      ></path>
      <path fill="#000" d="M52 12H12v40h40V12Z"></path>
      <path
        fill="#fff"
        d="M33 44H17v3h16v-3ZM17 29.383h2.98v-9.775H17v-2.616h8.843v2.616h-2.98v9.775h2.98V32H17v-2.616Zm10.643-.085h2.154a2.38 2.38 0 0 0 1.163-.279c.34-.186.602-.448.788-.788.186-.34.279-.727.279-1.163V16.992h2.926v10.28c0 .9-.207 1.709-.622 2.427a4.45 4.45 0 0 1-1.715 1.688c-.728.408-1.546.611-2.454.611h-2.519v-2.7Z"
      ></path>
    </svg>
  )
}
