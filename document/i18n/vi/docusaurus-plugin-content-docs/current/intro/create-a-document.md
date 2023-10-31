---
sidebar_position: 2
---

# Cách tạo một tài liệu mới

Tài liệu là **tập hợp các trang** được kết nối thông qua:

- **Sidebar**
- **Nút previous/next**

## Tạo tài liệu

Để tạo một tài liệu thì trước tiên tạo một thư mục mới bên trong thư mục folder `docs`

Tạo một tệp **.md** bên trong thư mục mới tạo

Ví dụ:

```md title="docs/hello.md"
# Xin chào

Đây là tài liệu đầu tiên được viết bằng **Docusaurus**!
```

Tài liệu sẽ có thể truy cập ở đường dẫn [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello).

## Điều chỉnh Sidebar

Thêm metadata để điều chỉnh tên và vị trí được hiển thị trên Sidebar:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

## Markdown

Tài liệu trong Docusasaurus được viết bằng markdown (.md hoặc .mdx), tài liệu tham khảo có thể xem ở [Github Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Các markdown cơ bản

### Heading

Sử dụng dấu # để đánh dấu văn bản là đầu mục

```md
`#` Là đầu mục lớn nhất của tài liệu, mỗi tài liệu chỉ tồn tại một
`##` Nhỏ đầu mục nhỏ hơn `#`
`###` Nhỏ hơn `##` và tương tự
```

### *Chữ in nghiêng*

```md
Sửa dụng *Văn bản được in nghiêng* để in nghiêng văn bản
```

### **Chữ in đậm**

```md
Sửa dụng **Văn bản được in đậm** để in đậm văn bản
```

### ***Chữ in đậm và nghiêng***

```md
Sửa dụng ***Văn bản được in đậm và nghiêng*** để in đậm và nghiêng văn bản 
```

### Đường dẫn liên kết

```md
Sửa dụng [Chữ được hiển thị](Đường dẫn) để tạo đường dẫn 
```

### Hình ảnh

```md
Sửa dụng ![Chữ được hiển thị khi ảnh chưa được tải](Đường dẫn đến ảnh) để tạo ảnh 
```

### Dòng code

```md
Sửa dụng dấu `` để đánh dẫu văn bản là một dòng code
`console.log('Hello world')`
```

### Đoạn code

```md
    Sửa dụng dấu `````` để đánh dẫu văn bản là đoạn code và jsx hoặc bất kỳ ngôn ngữ để thêm ngôn ngữ cho đoạn code 
    ```jsx
    console.log('Hello world')
    console.log('Hi')
    ```
```
