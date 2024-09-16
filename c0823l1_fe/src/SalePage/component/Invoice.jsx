import React, {Fragment} from 'react';
import { Image, Text, View, Page, Document, StyleSheet,Font } from '@react-pdf/renderer';
const Invoice = ({order}) => {
    // Đăng ký font Roboto



    const styles = StyleSheet.create({
        page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

        spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },

        titleContainer: {flexDirection: 'row',marginTop: 24},

        logo: { width: 90 },

        reportTitle: {  fontSize: 16,  textAlign: 'center' },

        addressTitle : {fontSize: 11,fontStyle: 'bold'},

        invoice : {fontSize: 20},

        invoiceNumber : {fontSize: 11},

        address : {  fontSize: 10},

        theader : {marginTop : 20,fontSize : 10,paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

        theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

        tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

        total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

        tbody2:{ flex:2, borderRightWidth:1, }

    })

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                {/*<Image style={styles.logo} src={logo} />*/}
                <Text style={styles.reportTitle}>CodeGym Mobile Shop - C0823L1</Text>
            </View>
        </View>
        // update InvoiceTitle component here
    );

    const Address = () => (
        // update Address component here
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}>Đơn hàng</Text>
                    <Text style={styles.invoiceNumber}>Số đơn hàng: {order.id} </Text>
                </View>
                {/*<View>*/}
                {/*    <Text style={styles.addressTitle}>Tên Khách hàng: {order.customer.name}</Text>*/}
                {/*    <Text style={styles.addressTitle}>Số điện thoại: {order.customer.phone}</Text>*/}
                {/*    <Text style={styles.addressTitle}>Email: {order.customer.email}</Text>*/}
                {/*</View>*/}
            </View>
        </View>
    );

    const UserAddress = () => (
        // update UserAddress component here
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{maxWidth : 200}}>
                    <Text style={styles.addressTitle}>Địa chỉ  </Text>
                    <Text style={styles.address}>
                        {order.customer.address}
                    </Text>
                </View>
            </View>
        </View>
    );

    const TableHead = () => (
        // update TableHead component here
        <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
            <View style={styles.theader}>
                <Text >Tên sản phẩm</Text>
            </View>
            <View style={styles.theader}>
                <Text>Serial</Text>
            </View>
            <View style={styles.theader}>
                <Text>Đơn giá</Text>
            </View>

        </View>
    );

    const TableBody = () => (
        // update TableBody component here
        order.productItemList.map((item)=>(
            <Fragment key={item.id}>
                <View style={{ width:'100%', flexDirection :'row'}}>
                    {/*<View style={[styles.tbody, styles.tbody2]}>*/}
                    {/*    <Text >{receipt.desc}</Text>*/}
                    {/*</View>*/}
                    <View style={styles.tbody}>
                        <Text>{item.product.name} </Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item.serial}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{item.product.price}</Text>
                    </View>
                </View>
            </Fragment>
        ))
    );

    const TableTotal = () => (
        // update TableTotal component here
        <View style={{ width:'100%', flexDirection :'row'}}>
            <View style={styles.total}>
                <Text></Text>
            </View>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.tbody}>
                <Text>Tổng cộng</Text>
            </View>
            <View style={styles.tbody}>
                <Text>
                    {order.productItemList.reduce((sum, item)=> sum + (item.product.price), 0)}
                </Text>
            </View>
        </View>
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle  />
                <Address/>
                <UserAddress/>
                <TableHead/>
                <TableBody/>
                <TableTotal/>
            </Page>
        </Document>
    )

}

export default Invoice;