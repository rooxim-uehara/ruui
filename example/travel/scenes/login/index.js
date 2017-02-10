import React, { Component } from 'react';
import { Image, View, ScrollView, Text, StyleSheet } from 'react-native';
import { Input, Button } from '../../../../src';
import { connect } from 'react-redux';

import { colors } from '../../utils';
import { ScreenWidthPadding } from '../../utils/screen';

class LoginScene extends Component {
  render () {
    return <ScrollView contentContainerStyle={styles.container}>
      <Image
        resizeMode={Image.resizeMode.contain}
        style={styles.appIcon}
        source={require('./beep.png')}/>

      <Text style={styles.loginText}>
		    {this.props.localize.titles.signIn}
      </Text>

      <View style={styles.formWrapper}>
        <Input floatingLabel={this.props.localize.placeholders.userAccount}
               ref="username" maxLength={128}/>
        <Input floatingLabel={this.props.localize.placeholders.password}
               wrapperStyle={{borderBottomWidth: 0}}
               underLineStyle={{backgroundColor: '#d3721b', bottom: 0}}
               ref="password" password={true}/>
      </View>

	    <Text style={styles.forgotPasswordText}>
		    {this.props.localize.titles.forgotPassword}
	    </Text>

	    <View style={styles.commandWrapper}>
		    <Button
			    wrapperStyle={[styles.buttonWrapper, styles.registerButton]}
			    title={this.props.localize.titles.register}/>
		    <Button
			    wrapperStyle={[styles.buttonWrapper, styles.loginButton]}
			    textStyle={{color: '#444444', fontWeight: '500'}}
			    rippleColor="#222222"
			    title={this.props.localize.titles.login}/>
	    </View>

	    <Text style={styles.supportText}>
		    {this.props.localize.titles.support}
	    </Text>
    </ScrollView>
  }
}

export default connect(state => {
  return {
    localize: state.app.localize,
  }
})(LoginScene);

const styles = StyleSheet.create({
  container: {
	  flex: 1, marginTop: 24,
    backgroundColor: colors.main,
	  justifyContent: 'center',
	  alignItems: 'center',
  },
	appIcon: {
		width: 300, height: 100,
		resizeMode: Image.resizeMode.contain,
		marginBottom: 30,
	},
	loginText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 10,
	},
	formWrapper: {
  	// height: 200,
		width: ScreenWidthPadding(40, 280),
		backgroundColor: 'white',
		borderRadius: 3,
		marginBottom: 10,
		overflow: 'hidden',
	},
	commandWrapper: {
		width: ScreenWidthPadding(40, 290),
		flexDirection: 'row'
	},
	errorText: {
		color: 'orange',
	},
	forgotPasswordText: {
		color: 'white',
		marginTop: 20,
		marginBottom: 15,
		textDecorationLine: 'underline',
	},
	supportText: {
		color: 'white',
		marginTop: 20,
		fontSize: 12,
	},
	buttonWrapper: {
		flex: 1,
		marginLeft: 5, marginRight: 5,
	},
	registerButton: {
		backgroundColor: "#9E9E9E",
	},
	loginButton: {
		backgroundColor: "#FFFFFF",
	}
});