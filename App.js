/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
// 引入页面
import Home from './pages/home/index'
import Edit from './pages/edit'
import Person from './pages/person'
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "home"
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          unselectedTintColor="#b0b0b0"
          tintColor="black"
        >
          <Icon.TabBarItem
            title="树洞"
            iconName="ios-planet"
            selectedIconName="ios-planet"
            iconSize={40}
            renderAsOriginal={true}
            iconColor="#b0b0b0"
            selectedIconColor="black"
            selected={this.state.selectedTab === "home"}
            onPress={() => {
              this.setState({
                selectedTab: "home"
              })
            }}
          >
            <Home />
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="编辑"
            iconName="ios-camera"
            selectedIconName="ios-camera"
            renderAsOriginal={true}
            iconColor="#b0b0b0"
            selectedIconColor="black"
            iconSize={40}
            selected={this.state.selectedTab === "edit"}
            onPress={() => {
              this.setState({
                selectedTab: "edit"
              })
            }}
          >
            <Edit />
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="个人中心"
            iconName="ios-person"
            selectedIconName="ios-person"
            renderAsOriginal={true}
            iconColor="#b0b0b0"
            selectedIconColor="black"
            iconSize={40}
            selected={this.state.selectedTab === "person"}
            onPress={() => {
              this.setState({
                selectedTab: "person"
              })
            }}
          >
            <Person />
          </Icon.TabBarItem>
        </TabBarIOS>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
