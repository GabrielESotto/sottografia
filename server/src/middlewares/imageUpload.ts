const multer = require("multer")
const path = require("path")

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    let folder = "";

    if(req.baseUrl.includes("photos")) {
      folder = "photos"
    }

    cb(null, `uploads/${folder}/`)
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req: any, file: any, cb: any) {
    if(!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg formats
      return cb(new Error("Por favor, envie apenas png ou jpg!"))
    }
    cb(undefined, true)
  }
})

module.exports = { imageUpload }
