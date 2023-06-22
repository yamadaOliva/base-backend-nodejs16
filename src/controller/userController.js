import {updateUserProfileService,getUserProfileService, userProfileUpdateService} from "../service/userService.js";

const updateUserProfileController = async (req, res) => {
    const user = req.body;
    try {
        const result = await updateUserProfileService(user);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
 
const getUserProfileController = async (req, res) => {
    const id = req.query.id;
    try {
        const result = await getUserProfileService(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

const userProfileUpdateController = async (req, res) => {
    const user = req.body;
    try {
        const result = await userProfileUpdateService(user);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    updateUserProfileController,
    getUserProfileController,
    userProfileUpdateController
}