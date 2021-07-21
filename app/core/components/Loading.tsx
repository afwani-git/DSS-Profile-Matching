import React from 'react';
import {
	Spinner,
} from 'react-bootstrap';

export const Loading: React.FC = () => {
	return (
		<div className="d-flex justify-content-center align-item-center" style={{
			width: "100%",
			height: "100vh"
		}}>
			<Spinner animation="border"/>
		</div>)
} 