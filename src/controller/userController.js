import {updateUserProfileService,getListUserProfilesService,getUserProfileService,userProfileUpdateService} from "../service/userService.js";

const updateUserProfileController = async (req, res) => {
    const user = req.body;
    try {
        const result = await userProfileUpdateService(user);
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

const createUserProfileController = async (req, res) => {
    const user = req.body;
    console.log("===>>>>>>",user);
    try {
        const result = await updateUserProfileService(user);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
const getListUserProfilesController = async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    try {
        const result = await getListUserProfilesService(page, limit);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    updateUserProfileController,
    getUserProfileController,
    getListUserProfilesController,
    createUserProfileController
}