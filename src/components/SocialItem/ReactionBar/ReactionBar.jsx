import React, { Component } from 'react';

class ReactionBar extends Component {

    render() {
        return (
            <View horizontal={true} style={styles.reactionContainer}>
                <TouchableOpacity>
                    <Icon name="thumbs-up" color="#318bfb" backgroundColor="#fff" style={styles.reactionIcon}></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="heart" color="#318bfb" backgroundColor="#fff" style={styles.reactionIcon}></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="grin-squint" color="#318bfb" backgroundColor="#fff" style={styles.reactionIcon}></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="surprise" color="#318bfb" backgroundColor="#fff" style={styles.reactionIcon}></Icon>
                </TouchableOpacity>
            </View>
        )
    }
}