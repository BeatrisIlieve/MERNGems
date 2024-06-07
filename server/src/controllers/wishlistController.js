const router = require("express").Router();
const wishlistManager = require("../managers/wishlistManager");

router.get("/find-all", async (req, res) => {
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const data = { user: userId };

  try {
    const result = await wishlistManager.findAll(data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.post("/create/:jewelryId", async (req, res) => {
  let userId;


  if (req.user) {
    userId = req.user._id;
  
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryId = Number(req.params.jewelryId);

  const data = { user: userId, jewelry: jewelryId };

  try {
    const result = await wishlistManager.create(data);

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

router.delete("/delete/:jewelryId", async (req, res) => {
    console.log("here")
  let userId;

  if (req.user) {
    userId = req.user._id;
  } else {
    userId = req.headers["user-uuid"];
  }

  const jewelryId = Number(req.params.jewelryId);

  const data = { user: userId, jewelry: jewelryId };

  try {
    const result = await wishlistManager.delete(data);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = router;
