export default {
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"

  },
    container: {
      flex: 1,
    },
    headerLeft: {
      flex: 0.3,
      backgroundColor: "#7CD1E9",
      alignSelf: "stretch",
    },
    headerBody: {
      flex: 0.4,
      backgroundColor: "#7CD1E9",
      alignSelf: "stretch", 
    },
    textBody:{
      alignSelf: "center",
    },
    headerRight: {
      flex: 0.3,
      backgroundColor: "#7CD1E9",
      alignSelf: "stretch",
    },
    BotsifyHeaderText: {
      alignSelf: "center",
      marginTop: 10,
      marginBottom: 10,
      fontSize: 27,
      color: "white",
      fontWeight: "bold",
      fontFamily: "sans-serif-thin"
    },
    BotsifyHeader: {
      flex: 1,
      backgroundColor: "#7CD1E9",
    },
    BotsifyHeaderRadius:{
        flex: 1,
        borderTopLeftRadius: 19,
        borderTopRightRadius: 19, 
        backgroundColor: "#FFFFFF",
      },
      BotUsersText:{
        textAlign: "left",
        paddingLeft: 25,
        marginTop: 25,
        marginBottom: 25,
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "sans-serif-light",
      },

      BotsSection:{
        flex: 1,
        borderRadius: 14,
        borderTop: 12,
        backgroundColor: "white",
        alignSelf: "stretch",
        //flexDirection: "column",
      },

      activeUsers:
      {
        backgroundColor: "#f2f2f2",
        flex:2,
        alignSelf: "stretch",
      },

      activeUsersBox: 
      {
        flex:1,
        alignContent: "center",
        alignItems: "center",

      },

      activeUsersText:
      {
        color: "#626f78",
        fontSize: 18,
        marginLeft: 25,
        marginTop: 15,
        marginBottom: 10,
        fontWeight: "bold",
      },

      userImage: {
      height: 55,
      width: 55,
      justifyContent: "flex-start",
      borderColor: "#7CD1E9",
      borderWidth: 2,
      marginBottom: 0,
      borderRadius: 55 / 2
      },

      usernameText:{
       
        margin: 0,
        padding: 0,
        textAlign: "center",
        fontSize: 14

      },

      chatUsersText:
      {
        color: "black",
        fontSize: 20,
        marginLeft: 25,
        marginTop: 25,
        marginBottom: 10,
        fontWeight: "bold",
      },

      chatStrip : {
        marginBottom: 5,
        borderWidth: 0,
        borderRadius: 4,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,    },

      chatImage: {
        margin: 13,
        height: 55,
        width: 55,
        borderColor: "#7CD1E9",
        borderWidth: 2,
        marginBottom: 13,
        borderRadius: 55 / 2,
      },

      sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        color: "black",
        fontSize: 20,
        marginLeft: 25,
        marginTop: 25,
        marginBottom: 10,
        fontWeight: "bold",
        backgroundColor: "white",
      },

      item: {
          padding: 10,
          fontSize: 18,
          height: 44,
      }, 

      usernameChat: {
        color: "black",
        fontSize: 15,
        marginLeft: 5,
        marginTop: 15,
        fontWeight: "bold",
        flexDirection: "column",
        
      },

      chatText:{
        color: "black",
        fontSize: 13.5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 15,
        flexDirection: "row",
      },

      timeText:{
        color: "#626f78",
        fontSize: 11,
        textAlign: "right",
        alignSelf: "stretch",
        marginRight: 0,
        marginTop: 15,
        flexDirection: "column",
      },

      horizontalLine: {
        borderBottomColor: "black",
        borderBottomWidth: 1, 
        flexDirection: "column",
        marginLeft: 110, 
        marginRight: 40
      }
  };