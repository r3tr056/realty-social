import React from "react";

class Post extends React.Component {
  render() {
    const { user, post } = this.props;

    return (
      <View style="container-center-horizontal">

        <View style="statusscreen">

          <View style="status-1">

            <View style="flex-row">

              <Image style="ellipse" src={ellipse} />

              <View style="flex-col">
                <Text style="imam-farrhoukvalign-text-middle">
                  {user}
                </Text>
                <Text style="addressvalign-text-middlenetflixsans-regular-normal-white-12px">
                  {post.elapsed_time}
                </Text>
              </View>
            </View>

            <div style="we-are-facing-a-seri">
              {}
            </div>
          </View>
          <div style="flex-row-1netflixsans-regular-normal-white-12px">
            <div style="likes">
              <div style="avatar-container">
                <img style="avatar" src={avatar1} />
                <img style="avatar-1" src={avatar2} />
                <img style="avatar-2" src={avatar3} />
              </div>
              <div style="address-1valign-text-middle">
                {address2}
              </div>
            </div>
            <div style="address-2valign-text-middle">
              {address3}
            </div>
            <div style="address-3valign-text-middle">
              {address4}
            </div>
          </div>
        </View>
      </View>
    );
  }
}

const statusData = {
  ellipse: "ellipse.png",
  imamFarrhouk: "Imam Farrhouk",
  address1: "4 min ago",
  weAreFacingASeri:
    "We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and content sites, and ad blockers eating into what’s left of it while slashing ad revenues.",
  avatar1: "avatar.png",
  avatar2: "avatar-1.png",
  avatar3: "avatar-2.png",
  address2: "47 likes",
  address3: "10 comments",
  address4: "2 shared",
};