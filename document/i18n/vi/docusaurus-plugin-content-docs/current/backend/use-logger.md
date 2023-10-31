---
sidebar_position: 1
---

# Cách sử dụng logger

## Import logger

```jsx
import logger from 'src/library/logger'
```

## Các mức độ của log

- info: dùng để ghi lại một sự kiện, thông báo không quá quan trọng
- warn: dùng để thông báo rằng có gì đó bất thường xảy ra
- error: dùng để thông báo rẳng đã có một lỗi xảy ra
- debug: dùng trong quá trình sửa lỗi

## Ví dụ

```jsx
logger.info("There is a user logged in")
logger.error("There is an error that need to be fixed")
```
