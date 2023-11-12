import { View, StyleSheet, Text, TextInput, Image, SafeAreaView, TouchableOpacity, ScrollView, Modal, } from "react-native";
import React from "react";
import { useState, useEffect} from "react";
export default function ListJob({ navigation}) {
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);
    const [workTitle, setWorkTitle] = useState("");
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        getItems();
        navigation.addListener("focus", () => {
            getItems();
        });
    }, []);
    const getItems = () => {
        fetch("https://654fb6d3358230d8f0cda3bd.mockapi.io/users", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res) {
                    setData(res);
                }
            })
            .catch((error) => console.error(error));
    };
    const deleteItem = (item) => {
        fetch("https://654fb6d3358230d8f0cda3bd.mockapi.io/users/" + item.id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then(() => {
                getItems();
            })
            .catch((error) => console.error(error));
    };
    const updateItem = () => {
        fetch("https://654fb6d3358230d8f0cda3bd.mockapi.io/users/" + id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // "id": item.id,
                "workTitle": workTitle,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then(() => {
                getItems();
                setVisible(false);
            })
            .catch((error) => console.error(error));
    };
    const editItem = (item) => {
        setWorkTitle(item.workTitle);
        setId(item.id);
        setVisible(true);
    };
    const handleVisibleModal = () => { // bat modal lên
        setVisible(!visible);
        console.log(visible);
    };
    const onChangeTitle = (text) => {
        setWorkTitle(text);
    };
    const onChangeId = (text) => {
        setId(text);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Modal animationType="slide" visible={visible}>
                <SafeAreaView>
                    <View style={styles.form}>
                        <TouchableOpacity
                            style={styles.btnClose}
                            onPress={() => handleVisibleModal()}
                        >
                            <Text style={styles.txtClose}>Close</Text>
                        </TouchableOpacity>
                        <Text style={styles.txtHeader}>Update Your Job</Text>
                        <TextInput style={styles.txtInputJob} placeholder=""
                            value={workTitle} onChangeText={onChangeTitle} /> 
                        <TouchableOpacity
                            style={styles.btnUpdate}
                            onPress={() => {
                                updateItem();
                            }}>
                            <Text style={styles.txtUpdate}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
            <View style={styles.header}>
                <Image
                    style={styles.iconSearch}
                    source={require("../img/search.png")}
                />
                <TextInput style={styles.txtInput} placeholder="Search" />
            </View>
            <ScrollView
                contentContainerStyle={{
                    padding: 20,
                    backgroundColor: "white",
                }}
            >
                {data.map((item, index) => {
                    return (
                        <View style={styles.item} key={index}>
                            <Image
                                style={styles.checked}
                                source={require("../img/checked.png")}
                            />
                            <Text style={styles.title}>{item.workTitle}</Text>
                            <TouchableOpacity
                                style={styles.btnModify}
                                onPress={() => {
                                    editItem(item);
                                }}
                            >
                                <Image
                                    style={styles.modify}
                                    source={require("../img/modify.png")}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnDelete}
                                onPress={() => deleteItem(item)}
                            >
                                <Image
                                    style={styles.delete}
                                    source={require("../img/delete.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.addJob}>
                <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={() => {
                        navigation.navigate("Add");
                    }}
                >
                    <Image style={styles.add} source={require("../img/add.png")} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        // flex: 1,
        // borderWidth: 1,
    },

    txtInput: {
        width: 344,
        height: 44,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 20,
        paddingLeft: 50,
    },
    iconSearch: {
        width: 20,
        height: 20,
        position: "absolute",
        top: 30,
        left: 30,
    },
    checked: {
        width: 20,
        height: 20,
        marginLeft: 20,
    },
    add: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    modify: {
        width: 20,
        height: 20,
    },

    delete: {
        width: 20,
        height: 20,
    },
    body: {
        alignItems: "center",
        marginTop: 50,
    },
    title: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
    },
    btnModify: {
        position: "absolute",
        right: 60,
    },
    btnDelete: {
        position: "absolute",
        right: 20,
    },
    item: {
        fontSize: 18,
        flexDirection: "row",
        alignItems: "center",
        height: 50,
        width: 340,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "#d8d4dc",
        marginBottom: 10,
    },
    add: {
        width: 20,
        height: 20,
    },
    addJob: {
        alignItems: "center",
        marginTop: 50,
    },
    btnAdd: {
        width: 60,
        height: 60,
        backgroundColor: "#00BDD6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginBottom: 20,
    },
    form: {
        padding: 15,
        // backgroundColor : "#e3e3e3",
        marginTop: 10,
    },
    txtInputJob: {
        width: 340,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#000",
        paddingLeft: 20,
    },
    txtUpdate: {
        color: "#fff",
    },
    txtClose: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "right",
    },
    btnClose: {
        alignItems: "flex-end",
    },
    btnUpdate: {
        width: 160,
        height: 40,
        backgroundColor: "#00BDD6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 90,
    },
    txtHeader: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#000",
        margin: 10,
        textAlign: "center",
        marginTop: 50,
    },
});