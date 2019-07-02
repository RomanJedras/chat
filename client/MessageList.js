import React from 'react';
import styles from './MessageList.css';


const Message = props => (
	
	<div className={styles.Message} style={{backgroundColor: (props.color || 'yellow')}}>
		<strong>{props.from} :</strong>
		<span>{props.text}</span>
	</div>
);


const MessageList = props => (
	<div className={styles.MessageList}>
		{
			props.messages.map((message, i) => {
				const user = props.users.find(user => user.name === message.from);
				let color = '';
				if (!!user) {
					color = user.color;
				}
				
				console.log('Finded user: ', user)
				return (
					<Message key={i}
					         from={message.from}
					         text={message.text}
					         color={color}
					/>
				);
			})
		}
	</div>

)

export default MessageList;

