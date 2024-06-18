## Raw & Transformed Data

This folder contains JSON pulled from Jisho.org, as well as transformed data based on it. The `raw.json` has a lot of properties that aren't easily usable for the application, or aren't relevant so we have to convert it into the `verbs.json` file.

We want the `verbs.json` file to be keyed by the slug so we can easily look it up within the application, but also want to have additional representations for ordering so we can progress through the lessons.
