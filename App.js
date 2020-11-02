import React from 'react';
import 'react-native-gesture-handler';
import { AppNavigation } from './src/Navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';

export default App = () => {
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    )
}
