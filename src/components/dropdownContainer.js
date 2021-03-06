import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import * as appActions from '../utils/store/appAction';
import { Style, Element, SnappingDirection, Layout, } from '../typeDefinition';

type Props = {
	dispatch?: Function,
	dropdownEvent?: 'onPress' | 'onLongPress',
	onPress?: Function,
	onLongPress?: Function,
	style?: Style,
	wrapperStyle?: Style,
	children?: Element,
	containerLayout?: Layout,
	dropdownComponent?: Component,
	dropdownWrapperStyle?: Style,
	dropdownContext?: Object,
	dropdownDirection?: SnappingDirection,
	dropdownSpacing?: number,
	dropdownOffset?: Object,
};

class RuuiDropdownContainer extends Component {
	static props: Props;

	static contextTypes = {
		ruuiStore: PropTypes.object,
	};

	static DropdownEvents = {
		onPress: 'onPress',
		onLongPress: 'onLongPress',
	};

	static defaultProps = {
		dropdownEvent: 'onPress',
		dropdownDirection: 'bottom',
		dropdownSpacing: 10,
		dropdownOffset: { top: 0, left: 0 },
	};

	constructor(props, context) {
		super(props);
		this.store = context.ruuiStore;
	}

	render() {
		const { wrapperStyle, style, children, ...otherProps } = this.props;

		return <TouchableOpacity
			style={wrapperStyle}
			onPress={this.onPress}
			onLongPress={this.onLongPress}
			{...otherProps}>
			<View 
			 renderToHardwareTextureAndroid
			 style={style}
			 ref={(container) => { this.container = container; }}>
				{children}
			</View>
		</TouchableOpacity>;
	}

	onPress = (e) => {
		const { onPress, dropdownEvent } = this.props;
		if (onPress) onPress(e); /* <- call default onPress, so that it'll work as normal */
		if (dropdownEvent === 'onPress') this.toggleDropdown();
	};

	onLongPress = (e) => {
		const { onLongPress, dropdownEvent } = this.props;
		if (onLongPress) onLongPress(e); /* <- call default onLongPress, so that it'll work as normal */
		if (dropdownEvent === 'onLongPress') this.toggleDropdown();
	};

	toggleDropdown = () => {
		const {
			dropdownWrapperStyle,
			dropdownComponent,
			dropdownDirection,
			dropdownSpacing,
			dropdownOffset,
			dropdownContext,
			containerLayout, } = this.props;

		this.container.measure((a, b, width, height, px, py) => {
			this.store.dispatch(appActions.toggleDropdown(true, {
				wrapperStyle: dropdownWrapperStyle,
				component: dropdownComponent,
				containerLayout: containerLayout || { x: px, y: py, width, height, },
				direction: dropdownDirection,
				spacing: dropdownSpacing,
				offset: dropdownOffset,
				context: dropdownContext,
			}));
		});
	};
}

export default RuuiDropdownContainer;

const styles = StyleSheet.create({
	container: {

	},
});
