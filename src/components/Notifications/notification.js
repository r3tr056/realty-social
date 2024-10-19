onPressNotificationHandler() {
    const { item, stories } = this.props;
    const { user } = item;
    switch (item.type) {
        case notificationsTypes.ANYONE_ACCEPT_YOUR_FRIEND_REQUEST:
            navigation.navigate('profile-x', { userId: user.id })
            break;
        case notificationsTypes.ANYONE_ADD_TO_STORY:
            const userIds = stories.map(story => story.userId)
            navigation.navigate('story-detail', { position: userIds.indexOf(user.id) })
            break;
        case notificationsTypes.ANYONE_ANSWER_YOUR_COMMENT:
            break;
        case notificationsTypes.ANYONE_ANSWER_YOUR_COMMENT_IN_GROUP:
            break;
        case notificationsTypes.ANYONE_COMMENT_POST_IN_GROUP_TOO:
            break;
        case notificationsTypes.ANYONE_LIVE_STREAM:
            break;
        case notificationsTypes.ANYONE_REACT_YOUR_COMMENT:
            break;

    }
}
