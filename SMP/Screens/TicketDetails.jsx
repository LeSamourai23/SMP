import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../Constants/constants'
import { Header } from '@rneui/themed';
import { Icon } from '@rneui/base';

const TicketDetails = ({ navigation, route }) => {

    const { item } = route.params;

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.mainContainer}>
            <Header
                leftComponent={
                    <View>
                        <TouchableOpacity onPress={goBack} style={{}}>
                            <Icon name="arrow-back-outline" type="ionicon" color={'black'} size={30} />
                        </TouchableOpacity>
                    </View>
                }
                centerComponent={{ text: 'Details', style: styles.header }}
                backgroundColor="transparent"
            />
            <ScrollView style={styles.ticketDetails} vertical showsVerticalScrollIndicator='false'>
                <View style={styles.detailsContainer}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: -1 }}
                        colors={[COLORS.TICKETDETAILS_LG1, COLORS.TICKETDETAILS_LG2]}
                        style={{ flex: 1, borderRadius: 20 }}>
                        <Text style={{ margin: 5, fontSize: 25, alignSelf: 'center' }}>Ticket Details</Text>

                        <View style={{ margin: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={styles.detailsText}>Ticket Number: </Text>
                                <Text style={styles.fetchedContent}>{item.ticket_no}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Created Date: </Text>
                                <Text style={styles.fetchedContent}>{item.created_on}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Last Updated Date: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Status: </Text>
                                <Text style={styles.fetchedContent}>{item.ticket_status}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Criticality: </Text>
                                <Text style={styles.fetchedContent}> {item.criticalityNumber}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Service Location: </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.detailsContainer2}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: -1 }}
                        colors={[COLORS.CUSTDETAILS_LG1, COLORS.CUSTDETAILS_LG2]}
                        style={{ flex: 1, borderRadius: 20 }}>
                        <Text style={{ margin: 5, fontSize: 25, alignSelf: 'center' }}>Customer Details</Text>
                        <View style={{ margin: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Customer Name: </Text>
                                <Text style={styles.fetchedContent}>{item.customer.first_name + " " + item.customer.last_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Mobile Number: </Text>
                                <Text style={styles.fetchedContent}>{item.customer.Mobile_No}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Customer Type: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>State: </Text>
                                <Text style={styles.fetchedContent}>{item.customer.state}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>District: </Text>
                                <Text style={styles.fetchedContent}>{item.customer.district}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Tehsil: </Text>
                                <Text style={styles.fetchedContent}>{item.customer.tehsil}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Village: </Text>
                                <Text style={styles.fetchedContent}>{item.customer.village}</Text>
                            </View>

                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.detailsContainer3}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: -1 }}
                        colors={[COLORS.MACHINEDETAILS_LG1, COLORS.MACHINEDETAILS_LG2]}
                        style={{ flex: 1, borderRadius: 20 }}>
                        <Text style={{ margin: 5, fontSize: 25, alignSelf: 'center' }}>Machine Details</Text>
                        <View style={{ margin: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Machine Number: </Text>
                                <Text style={styles.fetchedContent}> {item.machine.MACHINENO}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Product: </Text>
                                <Text style={styles.fetchedContent}> {item.machine.PRODUCT}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Machine Model: </Text>
                                <Text style={styles.fetchedContent}> {item.machine.MODEL_NAME}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Series: </Text>
                                <Text style={styles.fetchedContent}> {item.machine.SERIES}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>State: </Text>
                                <Text style={styles.fetchedContent}> </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>District: </Text>
                                <Text style={styles.fetchedContent}> </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Tehsil: </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Village: </Text>
                            </View>

                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.detailsContainer4}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: -1 }}
                        colors={[COLORS.REMARKS_LG1, COLORS.REMARKS_LG2]}
                        style={{ flex: 1, borderRadius: 20 }}>
                        <Text style={{ margin: 5, fontSize: 25, alignSelf: 'center' }}>Remarks</Text>
                        <View style={{ margin: 10, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Remark: </Text>
                                <Text style={styles.fetchedContent}>{item.remarks}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.detailsText}>Service Type: </Text>
                                <Text style={styles.fetchedContent}>{item.serviceType.service_type}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
        </View>
    )
}

export default TicketDetails

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#eaeff2',
        flex: 1,
        alignItems: 'center'
    },

    ticketDetails: {
        flex: 0.6,
    },

    ticketStatus: {
        flex: 0.4,
        alignItem: 'center',
        marginTop: 10
    },

    Heading: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        marginTop: 2,
        marginBottom: 2,
        alignSelf: 'center'
    },

    detailsContainer: {
        height: 300,
        width: 350,
        backgroundColor: '#92B2FD',
        margin: 5,
        borderRadius: 20,
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowColor: '#D6D8DC'
    },

    header: {
        color: '#151617',
        fontSize: 25,
        fontWeight: 600
    },

    detailsContainer2: {
        height: 300,
        width: 350,
        backgroundColor: '#AD7FFB',
        margin: 5,
        borderRadius: 20,
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowColor: '#D6D8DC'
    },

    detailsContainer3: {
        height: 300,
        width: 350,
        backgroundColor: '#F594B7',
        margin: 5,
        borderRadius: 20,
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowColor: '#D6D8DC'
    },

    detailsContainer4: {
        height: 300,
        width: 350,
        backgroundColor: '#CCD0F6',
        margin: 5,
        borderRadius: 20,
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowColor: '#D6D8DC'
    },

    statusContainer: {
        width: 350,
        height: 100,
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'center'

    },

    detailsText: {
        fontSize: 16,
        marginBottom: 7,
        opacity: 0.8,
        color: 'white'
    },

    fetchedContent: {
        fontSize: 15,
        color: 'black',
        opacity: 0.7,
        fontWeight: 'bold'
    }
})