import multer from 'multer'
import path from 'path'

export const uploadFile = multer({
  limits: {
    fieldSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    return callback(null, extname && mimetype)
  }
})
