import multer from 'multer'

export const uploadFile = multer({
  limits: {
    fieldSize: 50 * 1024 * 1024
  }
})
