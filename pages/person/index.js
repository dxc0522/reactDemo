import React, { Component,PureComponent,Fragment} from 'react'
import { View,Text,StyleSheet } from 'react-native'
export default class Person extends PureComponent{
    render(){
        return(
            <Fragment>
                <Text>个人中心</Text>
            </Fragment>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });
  