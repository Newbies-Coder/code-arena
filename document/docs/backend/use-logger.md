---
sidebar_position: 1
---

# How to use Logger

## Import logger

```jsx
import logger from 'src/library/logger'
```

## Log levels

- info: Used to record an event, a notification.
- warn: Used to notify that something unusual has occurred.
- error: Used to indicate that an error has occurred.
- debug: Used during the process of debugging.

## Example

```jsx
logger.info("There is a user logged in")
logger.error("There is an error that need to be fixed")
```
