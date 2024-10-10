#!/bin/bash

# Check if version is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a version number."
    echo "Usage: $0 <version_number>"
    exit 1
fi

VERSION=$1
RUN_MODE=false

# Check for --run flag
if [[ "$2" == "--run" ]]; then
    RUN_MODE=true
fi

git checkout v$VERSION
# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Navigate to the project root (assuming the script is in a subdirectory like 'scripts')
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Create the package
npm pack

# Create temp directory or real directory based on RUN_MODE
if [ "$RUN_MODE" = true ]; then
    INSTALL_DIR="$(dirname "$PROJECT_ROOT")/mock-codeclimbers/codeclimbers_install_$VERSION"
    mkdir -p "$INSTALL_DIR"
else
    INSTALL_DIR=$(mktemp -d)
fi
cd "$INSTALL_DIR"

# Create package.json with dynamic version
echo "{\"dependencies\":{\"codeclimbers\":\"file:$PROJECT_ROOT/codeclimbers-$VERSION.tgz\"}}" > package.json

# set environment variable
if [ "$RUN_MODE" = true ]; then
    export CODECLIMBERS_MOCK_INSTALL=false
else
    export NODE_ENV=development
    export CODECLIMBERS_MOCK_INSTALL=true
fi


# Install
npm install

# Run
node node_modules/codeclimbers/bin/run.js start

# Capture the exit status
EXIT_STATUS=$?

# Clean up
if [ "$RUN_MODE" = false ]; then
    cd "$PROJECT_ROOT"
    rm -rf "$INSTALL_DIR"
    rm "codeclimbers-$VERSION.tgz"
else
    echo "Installation completed in: $INSTALL_DIR"
    echo "The .tgz file is still in the project root directory."
fi

# Exit with the status from the codeclimbers execution
exit $EXIT_STATUS