#!/bin/bash

# Check if version is provided
if [ $# -eq 0 ]; then
    echo "Error: Please provide a version number."
    echo "Usage: $0 <version_number>"
    exit 1
fi

VERSION=$1

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Navigate to the project root (assuming the script is in a subdirectory like 'scripts')
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Create the package
npm pack

# Create temp directory
TEMP_DIR=$(mktemp -d)
cd $TEMP_DIR

# Create package.json with dynamic version
echo "{\"dependencies\":{\"codeclimbers\":\"file:$PROJECT_ROOT/codeclimbers-$VERSION.tgz\"}}" > package.json

# set environment variable
export CODECLIMBERS_MOCK_INSTALL=true

# Install
npm install

# Run
node node_modules/codeclimbers/bin/run.js start

# Capture the exit status
EXIT_STATUS=$?

# Clean up
cd "$PROJECT_ROOT"
rm -rf $TEMP_DIR

# Remove the .tgz file
rm codeclimbers-$VERSION.tgz

# Exit with the status from the codeclimbers execution
exit $EXIT_STATUS