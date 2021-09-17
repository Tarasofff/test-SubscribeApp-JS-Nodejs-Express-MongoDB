const dateHelper = require('../date-helper/date');

class UserDto {
    constructor(user) {
        this._id = user._id
        this.name = user.name
        this.surname = user.surname
        this.age = user.age
        this.date = dateHelper(user.date)
        this.friend = user.friend
        this.follower = user.follower
        this.subscribed = user.subscribed
        this.createdAt = dateHelper(user.createdAt)
        this.updatedAt = dateHelper(user.updatedAt)
    }
}

module.exports = UserDto;