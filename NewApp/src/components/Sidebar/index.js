import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Content, Text, List, ListItem, Container, View, Icon } from "native-base";
import _ from "lodash";
import styles from "./styles";

const avatarImage = require("../../../assets/default-avatar.png");

class SideBar extends Component {
  render() {
      const hellotest = this.props.hello;
    let logoutMenu = _.find(this.props.data, { route: "Logout" });
    return (
      <Container style={styles.container}>
        <View style={styles.drawerCover}>
          <Image source={avatarImage} style={styles.avatar}/>
          <Text style={styles.organizerName}>{hellotest}</Text>
        </View>
        <Content bounces={false}>
          
        </Content>
        <TouchableOpacity style={styles.footer} onPress={() => this.props.onPress(logoutMenu)}>
          <Icon
            active
            name={logoutMenu.icon}
            style={{ color: "#777", fontSize: 26, width: 30 }}
          />
          <Text style={styles.menuText}>{logoutMenu.name}</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default SideBar;
