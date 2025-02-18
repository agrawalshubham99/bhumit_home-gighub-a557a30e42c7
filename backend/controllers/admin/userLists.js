const { isNullUndefineOrEmpthy, resMsg } = require("../../middleware/authMiddleware");
const UserInfo = require("../../models/UserInfo");

const getAllUserLists = async (req, res) => {
    try {
        const result = await UserInfo.find({});
        if (result.length >= 0) {
            resMsg(res, "Successfully Fetching Data.", result, null, 201, "/admin/getUserLists");
        } else {
            resMsg(res, "Data Not Found", null, null, 404, "/admin/getUserLists");
        }
    } catch (error) {
        console.log(error);
        resMsg(res, "Something Was Wrong", null, null, 500, "/admin/getUserLists");
    }
}



module.exports = { getAllUserLists };