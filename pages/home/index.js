import React, { Component, PureComponent, Fragment } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, Dimensions, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import request from '../../assets/common/request'
// 获取屏幕宽高
const { width, height } = Dimensions.get('window');
// 列表渲染组件
function ItemView(row) {
    return (
        <TouchableHighlight>
            <View style={styles.item}>
                <Text style={styles.title}  >
                    {row.title}
                </Text>
                <Image source={{ uri: row.thumb }} style={styles.thumb} />
                <Icon
                    name="ios-play-circle"
                    size={28}
                    style={styles.play}
                />
                <View style={styles.itemFooter}>
                    <View style={styles.handleBox}>
                        <Icon
                            name="ios-heart"
                            size={28}
                            style={styles.up}
                        />
                        <Text style={styles.handleText}>喜欢</Text>
                    </View>
                    <View style={styles.handleBox}>
                        <Icon
                            name="ios-chatboxes"
                            size={28}
                            style={styles.commentIcon}
                        />
                        <Text style={styles.handleText}>评论</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}
function sepa() {
    return (
        <View style={{ height: 10, backgroundColor: '#eee' }}></View>
    )
}
function header() {
    return (
        <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
            <Image source={require("../../assets/img/loading.gif")} />
        </View>
    )
}
export default class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            spaceList: [],
            refresh: false,
            pageIndex: 0,
            pageNum: 1
        }
    }
    async componentDidMount() {
        this.setState({
            refresh: true
        })
        this._getList().then(res => {
            this.setState({
                refresh: false,
            })
        }, err => {
            this.setState({
                refresh: false,
            })
        })
    }
    // 获取列表信息
    async _getList() {
        let {
            pageIndex,
            pageNum
        } = this.state;
        if (pageIndex + 1 <= pageNum) {
            try {
                this.state.pageIndex++;
                const result = await request.get("spaceList", {
                    pageIndex: pageIndex + 1
                })
                this.state.pageNum = 10;
                this.setState({
                    spaceList: [...this.state.spaceList, ...result.data],
                })
                await Promise.resolve()
            } catch (error) {
                await Promise.reject(err)
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>首页</Text>
                </View>
                <FlatList
                    data={this.state.spaceList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => ItemView(item)}
                    automaticallyAdjustContentInsets={false}
                    keyboardDismissMode="interactive"
                    initialNumToRender={5}
                    ItemSeparatorComponent={sepa}
                    // ListHeaderComponent={header}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            size={30}
                            tintColor="#aaa"
                            title="疯狂刷新中..."
                            titleColor="#aaa"
                            onRefresh={() => {
                                if (!this.state.refresh) {
                                    this.state.pageIndex = 0;
                                    this.state.pageNum = 1;
                                    this.state.spaceList = [];
                                    this._getList()
                                }
                            }}
                        />
                    }
                    // ListEmptyComponent={header}
                    // ListFooterComponent={!this.state.refresh ? header : null}
                    onEndReachedThreshold={100}
                    onEndReached={() => {
                        debugger
                        !this.state.refresh ? this._getList() : null
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5fcff",
    },
    header: {
        paddingTop: 30,
        paddingBottom: 12,
        backgroundColor: 'black'
    },
    headerTitle: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600"
    },
    // 列表组件样式
    item: {
        width: width,
        backgroundColor: "#fff",
        position: "relative",
    },
    thumb: {
        width: width,
        height: width * 0.56,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        color: "#333",
        overflow: "hidden",
        height: 40,
        lineHeight: 40,
        width: width - 40,
        paddingLeft: 20,
    },
    itemFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#eee",
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    play: {
        position: "absolute",
        bottom: 60,
        right: 14,
        fontSize: 50,
        color: "#fff"
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: "#333"
    },
    up: {
        fontSize: 22,
        color: "#333"
    }
});
