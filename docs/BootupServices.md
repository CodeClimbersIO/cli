# Bootup Services

Some direction on troubleshooting and working with the startup services that the CLI works with. Utilizes the packages `node-mac`, `node-windows`, and `node-linux` to help manage the system processes.

## Mac

Mac makes use of registering plist files for the user that dictates what services to startup when a user logs into their computer.

Because of a limitation of the packages we are using to manage the startup, we have to start the process through `startup.js` and then execute a bash script `run.sh` to establish the correct running environment for machines that are using `nvm`

### Quickstart

1. `./bin/dev.js start` to start and enable services
2. On any change that you need to see reflected in the plist:

- `./bin/dev.js startup:disable` to stop and disable services and then `rm -rf ~/Library/LaunchAgents/codeclimbers.plist`
- `./bin/dev.js start` to see reflected changes

### Deprecated: Manual Quickstart

**from an older way of managing the services that we were managing the plist directly instead of using the packages**
The [startup.plist.ts](../packages/server/src/assets/startup.plist.ts) file is what creates the plist file that is
dynamic to
the users' system. I have been testing the process of loading the plist file by doing the following:

1. `launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/io.codeclimbers.plist` to unload application if it is already
   registered.
2. At project root `./bin/dev.js start` to mimic someone running the start command for the first time.
3. Read logs for issues with start command
4. `tail -f ~/.codeclimbers/log.err` and `tail -f ~/.codeclimbers/log.out` for logging from the application.

### Deprecated: Common Commands

**from an older way of managing the services that we were managing the plist directly instead of using the packages**

- `launchctl bootstrap gui/$(id -u) io.codeclimbers.plist` to load service. The program will start as soon as it is
  loaded and be added to
  registry of startup services.
- `launchctl bootout gui/$(id -u) io.codeclimbers.plist` to unload service. The program will stop as soon as unloaded
  and be removed
  from
  registry of startup services.
- `launchctl list io.codeclimbers.plist` to show last error status and program arguments being used on startup
- `tail -f ~/.codeclimbers/log.err` to view latest errors
- `tail -f ~/.codeclimbers/log.out` to view latest application logs

### Notes

We are executing a bash script `./bin/run.sh` instead of `./bin/run.js` to make sure nvm is supported regardless of
where the user puts their nvm export script (.zshrc for example).

## Windows

To be built

## Linux

To be built
