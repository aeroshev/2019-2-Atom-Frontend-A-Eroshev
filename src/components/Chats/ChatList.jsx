import React from 'react';
import { DialogBox } from './DialogBox';
import styles from '../../styles/ChatList.module.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveChat } from '../../actions';


const putDispatchToProps = (dispatch) => {
	return {
		setChat: bindActionCreators(setActiveChat, dispatch),
	};
};

const WrappedDialogBox = connect(null, putDispatchToProps)(DialogBox);


export function ChatList (props) {
	const list = [];
	const { chatList } = props;

	if (!chatList.length) {
		list.push(<div key={0} className={styles.noMessage}>No chats</div>);
	} else {
		chatList.map((item, idx) => {
			const Chat = <WrappedDialogBox key={idx} boxInfo={item}/>;
			list.push(Chat);
			
			return 0;
		});
	}

	return (			
			<div className={styles.wrap}>{list}</div>
	);
}

