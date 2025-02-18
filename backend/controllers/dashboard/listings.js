const Listing = require("../../models/Listing");
const {
  isNullUndefineOrEmpthy,
  resMsg,
} = require("../../middleware/authMiddleware");

// CREATE a new listing
const addList = async (req, res) => {
  try {
    const { jobTitle, jobDescription, imageLink, department, location, status, price } = req.body;
    if (
      !isNullUndefineOrEmpthy(jobTitle) &&
      !isNullUndefineOrEmpthy(jobDescription) &&
      !isNullUndefineOrEmpthy(location) &&
      !isNullUndefineOrEmpthy(price)
    ) {
      const results = new Listing(req.body);
      await results.save();
      resMsg(res, "List added Successfully", results, null, 201, "api/listings/addList");
    } else {
      return resMsg(res, "Requiered Field: Please Enter Value", null, null, 400, "api/listings/addList");
    }
  } catch (error) {
    console.log(error);
    resMsg(res, "Error creating listing", null, error, 400, "api/listings/addList");
  }
};

// GET all listings
const getAllLists = async (req, res) => {
  try {
    const results = await Listing.find({});
    if (results.length >= 0) {
      resMsg(res, "Successfully fetch the data", results, null, 201, "api/listings/getAllLists");
    } else {
      resMsg(res, "Data Not Found", null, null, 404, "api/listings/getAllLists");
    }
  } catch (error) {
    console.log(error);
    resMsg(res, "Something was wrong", null, null, 500, "api/listings/getAllLists");
  }
};

// GET one listing by ID
const getUserByLists = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await Listing.find({ userId });
    if (result) {
      return resMsg(res, "Successfully fetching the data", result, null, 201, "api/listings/getUserByLists")
    } else {
      return resMsg(res, "Data Not Found", null, null, 404, "api/listings/getUserByLists");
    }
  } catch (error) {
    console.log(error);
    return resMsg(res, "Something was wrong", null, null, 500, "api/listings/getUserByLists");
  }
};

// UPDATE a listing
const updateList = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated document
    );
    console.log(updatedListing);
    if (!updatedListing) {
      return resMsg(res, 'Data Not Found', null, null, 404, "api/listings/updateList")
    }
    resMsg(res, 'Successfully Update the data', updatedListing, null, 200, "api/listings/updateList")
  } catch (error) {
    console.log(error);
    resMsg(res, 'Something was wrong', null, null, 500, "api/listings/updateList");
  }
};

// DELETE a listing
const deleteList = async (req, res) => {
  try {
    const deleted = await Listing.findOneAndDelete(req.params.id);
    if (!deleted) {
      return resMsg(res, 'Data Not Found', null, null, 404, "api/listings/deleteList")
    }
    resMsg(res, 'Successfully Delete the data', null, null, 200, "api/listings/deleteList")
  } catch (error) {
    resMsg(res, 'Something was wrong', null, null, 500, "api/listings/deleteList");
  }
};

module.exports = { addList, getAllLists, getUserByLists, updateList, deleteList };
