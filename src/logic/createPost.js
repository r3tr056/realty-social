var author = {
    pofilePic: '',
    profileDescription: '',
    username: ''
}

function createPost(postid, caption, content, poster) {
    var uid = firebase().auth().currentUser.uid;
    var post = {
        poster: poster,
        uid: uid,
        postContent: content,
        postCaption: caption,
        postStats: {
            likes: [],
            comments: [],
            commentCount: 0,
            shares: 0,
            shares_ref: [],
        },
    };
    var postKey = firebase.database().ref().child('posts').push().key;
    var postUpdates = {};
    updates['/posts/' + postKey] = post;
    updates['/user-posts/' + uid + '/' + postKey] = post;

    return firebase.database().ref().update(updates);
}

function likePost(postRef, uid) {
    postRef.transaction((postStats) => {
        if (postStats) {
            if (postStats.likes && postStats.likes[uid]) {
                postStats.likes--;
                postStats.likes[uid] = null;
            } else {
                postStats.likes++;
                if (!postStats.likes) {
                    postStats.likes = {};
                }
                postStats[uid] = true;
            }
        }
        return postStats;
    });
} 

function newComment(postId, user, uid, text) {
    firebase.database().ref('post-comments/' + postId).push({
        text: text,
        user: username,
        uid: uid,
    });
}

function writeUserData(uid, profile) {
    firebase.database().ref('users/' + uid).set({
        username: profile.username,
        email: profile.email,
        profile_pic: profile.profile_pic,
    });
}

