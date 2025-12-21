const Listing = require("../models/listing");

module.exports.index=async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

 module.exports.renderNew = (req, res) => {
  res.render("listings/new.ejs");
};
module.exports.showlisting=async (req, res, next) => {
  try {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");

    if(!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing});

  } catch (err) {
    next(err);
  }
};

module.exports.createlisting= async (req, res,next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  req.body.listing.image = {url, filename};
  try{
    console.log(req.body.listing);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url, filename};
  await newListing.save();
  req.flash("success","New Listing Created!");
  res.redirect("/listings");
  }
  catch (err) {
  next(err);
}

};

module.exports.editlisting= async (req, res, next) => {
  try {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
  } catch (err) {
    next(err);
  }
};

module.exports.updatelisting = async (req, res) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

  
    listing=await Listing.findByIdAndUpdate(id, {
        ...req.body.listing
    });
  if(typeof req.file!="undefined"){
     let url = req.file.path;
  let filename = req.file.filename;
  listing.image={url, filename};
  await listing.save();
  }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deletelisting= async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
};

module.exports.searchListings = async (req, res) => {
  try {
    const { q } = req.query;

    const allListings = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } }
      ]
    });

    res.render("listings/index", { allListings });
  } catch (err) {
    console.log(err);
    res.redirect("/listings");
  }
};
