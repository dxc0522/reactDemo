import React, { Component,PureComponent,Fragment} from 'react'
import { View,Text,StyleSheet } from 'react-native'
export default class Edit extends PureComponent{
    render(){
        return(
            <Fragment>
                <Text>编辑</Text>
            </Fragment>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });
  