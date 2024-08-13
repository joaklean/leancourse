import User from '../models/User';

export const UserService = {
    register: async (username, password) => {
        const user = new User({username, password});
        return await user.save();
    },
    login: async (username) => {
        return User.findOne({username},null,null);
    }
};
