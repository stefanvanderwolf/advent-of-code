#!/bin/sh

# Get next minor version and strip the `v` prefix.
version=$(npm version minor --no-git-tag-version | cut -c2-)

# Find the current latest and increase from there.
latest=$(./bin/find-latest.sh || exit 128)
next=$(( latest + 1))

# Create a tmp package file because `jq` cannot replace directly and set the
# new version in the package.
package=$(jq ".scripts.\"$next\" = \"npm run start -- ./dist/$next.js\" | .version = \"$version\"" package.json)
package=$(printf '%s' "$package" | jq '.scripts |= (to_entries | sort_by(.key) | reverse | from_entries)')

printf '%s' "$package" > package.json

# Create source and test files
[ ! -f "src/$next.ts" ] && touch "src/$next.ts" 
[ ! -f "src/$next.test.ts" ] && touch "src/$next.test.ts" 
