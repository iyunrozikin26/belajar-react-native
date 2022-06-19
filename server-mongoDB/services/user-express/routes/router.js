const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.getAllUsers);
router.get("/:id", Controller.getOneUser);
router.post("/login", Controller.postLogin);
router.post("/register", Controller.postRegister);
router.patch("/:id", Controller.patchUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
