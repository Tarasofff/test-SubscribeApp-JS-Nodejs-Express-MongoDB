const User = require('./user.model');
const UserDto = require('./user.dto');

const create = async user => new UserDto(await new User({
    name: user.name,
    surname: user.surname,
    age: user.age,
    friend: user.friend,
    subscribed: user.subscribed,
    follower: user.follower
}).save())

const getAll = async () => {
    let arr = []
    const user = await User.find({})
    user.map(i => arr.push(new UserDto(i)))
    return arr;
}

const getById = async id => new UserDto(await User.findById(id))

const subscribe = async (userId, subscribeUserId) => {
    const who = await getById(userId);
    const onWhom = await getById(subscribeUserId);

    if (userId === subscribeUserId) return 'you cant subscribe to yourself'

    const subscribeExists = who.subscribed.find(i => i.toString() === subscribeUserId)
    if (subscribeExists) return 'Already subscribe'

    await User.updateOne({_id: who._id}, {$push: {"subscribed": onWhom._id}})
    await User.updateOne({_id: onWhom._id}, {$push: {"follower": who._id}})
    await setFriend(who._id, onWhom._id)

    return true;
}

const unsubscribe = async (userId, unsubscribeUserId) => {
    const currentUser = await getById(userId);
    const unsubscribeUser = await getById(unsubscribeUserId);

    if (userId === unsubscribeUserId) return 'you cant unsubscribe from yourself'

    await User.updateOne({_id: currentUser._id}, {$pull: {"subscribed": unsubscribeUser._id}})
    await User.updateOne({_id:unsubscribeUser._id}, {$pull: {"follower": currentUser._id}})
    await User.updateOne({_id: currentUser._id}, {$pull: {"friend": unsubscribeUser._id}})
    await User.updateOne({_id: unsubscribeUser._id}, {$pull: {"friend": currentUser._id}})

    return true;
}

const setFriend = async (whoId, onWhoId) => {
    const currentUser = await getById(whoId)
    const newUserFriend = await getById(onWhoId)
    if (currentUser.subscribed.find(i => i).toString() === currentUser.follower.find(i => i).toString()) await User.updateOne({_id: currentUser._id}, {$push: {"friend": newUserFriend._id}})
    if (newUserFriend.subscribed.find(i => i).toString() === newUserFriend.follower.find(i => i).toString()) await User.updateOne({_id: newUserFriend._id}, {$push: {"friend": currentUser._id}})
}

// const getOnePopular = async () => {
//     const mostPopular = []
//     const users = await getAll();
//     if(!users.length) return mostPopular;
//     users.reduce((prev, current) => {
//         if ((typeof current && typeof prev) === "object") {
//             if (prev.follower.length || current.follower.length) {
//                 if (prev.follower.length === current.follower.length) return mostPopular.push(prev, current)
//                 return prev.follower.length > current.follower.length ? mostPopular.push(prev) : mostPopular.push(current)
//             }
//         }
//     })
//     return mostPopular;
// }

const getPopular = async (count = 3) => {
     const mostPopular = []
     const users = await getAll();
     if(!users.length) return mostPopular;
     users.map(i => mostPopular.push({id: i._id, followers: i.follower}))
     return mostPopular.sort((a, b) => b.followers.length - a.followers.length).slice(0, count);
}

const getFriends = async id => {
    const user = await getById(id)
    return {userId: user._id, friends: user.friend, count: user.friend.length}
}

module.exports = {
    create,
    getAll,
    getById,
    subscribe,
    unsubscribe,
    getFriends,
    getPopular
}