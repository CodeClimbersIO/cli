# Troubleshooting

Some things to try if you are having trouble using Codeclimbers

## Dashboard says "Looks like you need to update your api key" and when you run "npx codeclimbers config:apikey" it says "Command not found"

1. Make sure you are using the latest version of the CLI (`npx codeclimbers startup:disable && npx codeclimbers@latest start`)
2. If you have installed the CLI globally, you may need to update your global version (`npm update -g codeclimbers`)

## Extensions (VSCode, Chrome, etc...)

### The extension is asking for an api key

Ordinarily, the CLI should make the adjustments to the `.wakatime.cfg` file for you so that you don't have to do anything. Occasionally, this may not work and the api_key that the extensions are looking for will be missing.

Sometimes, this can also happen if you install the extension before you've run the CLI on your machine for the first time.

To fix. Replace `~/.wakatime.cfg` with

```
[settings]
api_key = eacb3beb-dad8-4fa1-b6ba-f89de8bf8f4a
api_url = http://localhost:14400/api/v1/wakatime
```
