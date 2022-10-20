//import "react-native-gesture-handler"
import React from "react"
import NavigationBottomTabs from "./src/navigation/NavigationBottomTabs"
import NavigationDrawer from "./src/navigation/NavigationDrawer"
import { Provider } from "react-redux"
import store from "./src/redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <NavigationDrawer />
    </Provider>
  )
}

export default App
