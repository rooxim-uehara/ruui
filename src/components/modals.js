import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';

import { connect } from '../utils/ruuiStore';

import Modal from './modal';

type Props = {
	modals?: Array<Object>,
	dispatch?: Function,
};

@connect(({ activeModals }) => {
	return {
		modals: activeModals,
	};
})

class RuuiModals extends Component {
	props: Props;

	render() {
		const { dispatch, modals } = this.props,
			modalArray = Object.keys(modals).map(key => Object.assign({}, modals[key], { id: key }));

		return <View
			pointerEvents="box-none"
			style={styles.container}>
			{modalArray.map((modalConfigs, i) => {
				return <Modal
					key={i}
					modalCount={modalArray.length}
					dispatch={dispatch}
					{...modalConfigs}/>;
			})}
		</View>;
	}
}

export default RuuiModals;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
	},
});
