const categoryService = require("../service/categoryService");
const userService = require("../service/userService");

module.exports = {
    async createCategory(req, res) {
        try{
            const category = req.body;
            const user = req.user;
            const createdCategory = await categoryService.createCategory(category.name, user._id);
        }
        catch(error){
            if(error instanceof Error){
                res.status(400).json({ error: error.message});
            } else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    },

async getRestaurantCategories(req, res){
        try{
            const { id } = req.params;

            const user = req.user;
            const categories = await categoryService.findCategoryByRestaurantId(id);
            res.status(200).json(categories);
        }
        catch(error){
            if(error instanceof Error){
                res.status(400).json({ error: error.message});
            } else{
                res.status(500).json({ error: "Internal server error"});
            }
        }
    }
}