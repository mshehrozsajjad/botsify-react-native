export default {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerLeft: {
    flex: 0.3
  },
  headerBody: {
    flex: 1,
      backgroundColor:'#7CD1E9'
  },
  textBody:{
    alignSelf: "center",
      color: '#ffffff',
      fontFamily: 'Lato-Regular',
      fontWeight:'bold',
      fontSize:22
  },backbutton:{
    width:15,  
    height:15  
},
          CurveHeaderText: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 27,
    color: "white",
    fontWeight: "bold",
  },

  CurveHeader: {
    flex: 1,
    backgroundColor: "#7CD1E9",
  },

  YourBotText:{
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 27,
    fontWeight: "bold",
  },

  CurveHeaderRadius:{
    flex: 1, 
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19, 
    backgroundColor: "#FFFFFF",
  },
BotsSection:{
    flex: 0.1,
    borderRadius: 14,
    borderTop: 12,
    backgroundColor: "white",
    alignSelf: "stretch",
    //flexDirection: "column",

  },
    row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
    scrollcontainer: {
   flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
    mainHeading:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1d1d1d',
        fontWeight:'bold',
        fontSize:26
        
    },
   
   item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: '#d1d1d1',
    borderWidth: 1.25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  itemText: {
    color: '#000000',
    fontFamily: 'Lato-Regular',
  },
  itemImage: {
    height: 45,
    width: 45,
    borderRadius: 45/2,
      overflow: 'hidden'
  },
  headerRight: {
    flex: 0.3
  }
};
