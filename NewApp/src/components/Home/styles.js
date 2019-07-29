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

  BotsSection:{
    flex: 9,
    borderRadius: 14,
    borderTop: 12,
    backgroundColor: "white",
    alignSelf: "stretch",
    //flexDirection: "column",

  },

  YourBotText:{
    textAlign: "left",
    paddingLeft: 42,
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "sans-serif-light",
  },

  BotsifyHeaderRadius:{
    flex: 1, 
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19, 
    backgroundColor: "#FFFFFF",
  },

  BotViewHorizontal:{
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  BotViewLeft:{
    borderRadius: 2,
    backgroundColor: "white",
    borderColor: "#7CD1E9",
    borderWidth: 3,
    flex: 1,
    marginBottom: 15,
    marginLeft: 20,
    marginTop: 15,
    marginRight: 21,
    alignItems: "center",
  },

  BotViewRight:{
    borderRadius: 2,
    backgroundColor: "white",
    borderColor: "#7CD1E9",
    borderWidth: 3,
    flex: 1,
    marginBottom: 15,
    marginLeft: 21,
    marginTop: 15,
    marginRight: 20,
    alignItems: "center",

  },

  BotNameText:{
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    fontSize: 15,
    flexDirection: "column",
    marginBottom: 10,
    fontFamily: "sans-serif",
  },

  BotImage:
  {
      alignSelf: "center",
      marginTop: 15,
      marginBottom: 10,
      height: 65,
      width: 55,
  }
};
