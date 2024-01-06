// const path = require("path");
// const multer = require("multer");

// // Create a storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./posters/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// // var upload = multer({
// //   storage: storage,
// //   fileFilter: function (req, file, callback) {
// //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
// //       callback(null, true);
// //     } else {
// //       console.log("only jpg & png allowed");
// //       callback(null, false);
// //     }
// //   },
// //   limits: {
// //     fileSize: 1024 * 1024 * 2,
// //   },
// // });
// const upload = multer({ storage });
// module.exports = upload;
