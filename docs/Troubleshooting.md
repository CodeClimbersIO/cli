# Troubleshooting

Some things to try if you are having trouble using Codeclimbers

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
