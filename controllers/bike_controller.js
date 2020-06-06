const express = require("express");
const Bike = require("../models/allbikes.js");
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect("/sessions/new");
  }
};

//add new bike
router.get("/new", isAuthenticated, (req, res) => {
  res.render("bikes/bike_new.ejs", { currentUser: req.session.currentUser });
});

//edit a bike
router.get("/:id/edit", isAuthenticated, (req, res) => {
  Bike.findById(req.params.id, (err, findDreamBike) => {
    res.render("bikes/bike_edit.ejs", {
      bike: findDreamBike,
      currentUser: req.session.currentUser,
    });
  });
});
// delete a bike
router.delete("/:id", isAuthenticated, (req, res) => {
  Bike.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/bikes");
  });
});

//show page
router.get("/:id", isAuthenticated, (req, res) => {
  if (req.session.currentUser) {
    Bike.findById(req.params.id, (err, gotbikes) => {
      res.render("bikes/bike_show.ejs", {
        bike: gotbikes,
        currentUser: req.session.currentUser,
      });
    });
  } else {
    res.redirect("/sessions/new");
  }
});

//update
router.put("/:id", (req, res) => {
  Bike.findByIdAndUpdate(
    req.params.id,
    req.body,

    (err, updatedModel) => {
      res.redirect("/bikes/");
    }
  );
});

//create
router.post("/", (req, res) => {
  Bike.create(req.body, (error, makeDreamBike) => {
    res.redirect("/bikes/");
  });
});
//index page
router.get("/", (req, res) => {
  Bike.find({}, (error, mybikes) => {
    res.render("bikes/bike_index.ejs", {
      bikes: mybikes,
      currentUser: req.session.currentUser,
    });
  });
});
//seed bikes
router.get("/seed", async (req, res) => {
  const newProducts = [
    {
      title: "Blak Beauty",
      description: " BMW R100 RT dubbed Black Stallion ",
      img:
        "https://kickstart.bikeexif.com/wp-content/uploads/2016/12/custom-bmw-motorcycle-625x417.jpg",
      comment: "great color setup",
      manufacture: "BMW",
      price: 15000,
    },
    {
      title: " DUCATI CAFE RACER",
      description: "A SUPERLIGHT SCRAMBLER DUCATI FROM ROUGH CRAFTS",
      img:
        "https://kickstart.bikeexif.com/wp-content/uploads/2017/08/scrambler-ducati-icon-cafe-racer-1-625x417.jpg",
      comment: "ducati one of my favorite companies",
      manufacture: "Ducati",
      price: 17000,
    },
    {
      title: "DOWN & OUT’S INTIMIDATING T100",
      description:
        " Triumph Bonneville T100  It’s a throwback to 1960s style, right down to the peashooter exhausts and two-tone paint.",
      img:
        "https://kickstart.bikeexif.com/wp-content/uploads/2016/03/t100-1-625x417.jpg",
      comment: "love the ruggid tuff look",
      manufacture: "Triumph",
      price: 20000,
    },
    {
      title: " Yamaha XV Cafe Fighter",
      description:
        "From Moose Motod the current and undisputed king of Virago buildsesigns.",
      img:
        "https://www.pipeburn.com/wp-content/uploads/2019/02/12_02_2019_Moose_Motodesigns_Yamaha_XV_Virago_customs_Pipeburn_02.jpg",
      comment: "coolest bikes for custom jobs",
      manufacture: "Yamaha",
      price: 21000,
    },
  ];
  try {
    const bikeItems = await Bike.create(newProducts);
    res.render("bikes/bike_seed.ejs");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
