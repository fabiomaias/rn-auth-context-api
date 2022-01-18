import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import AuthContext from '../../contexts/auth';

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' }
});

const Dashboard: React.FC = () => {
    const { signed, signOut } = useContext(AuthContext);  
    
    function handleSignOut() {
       signOut();
    }

    return (
        <View style={styles.container}>
            {signed && <Button title="Sign Out" onPress={handleSignOut} />}
        </View>
    );
};

export default Dashboard;