import React from "react"
import { View, Text } from "react-native"
import NavigationBottomTabs from "./src/navigation/NavigationBottomTabs"
import { Provider } from "react-redux"
import store from "./src/redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <NavigationBottomTabs />
    </Provider>
  )
}

export default App
