import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
	ToggleButtonGroup,
	ToggleButton,
	ButtonGroup,
	Button,
} from "react-bootstrap";

const Test = () => {
	const [value, setValue] = useState(1);

	const handleChange = (e) => {
		// console.log();
		// console.log(e.target);
		setValue(e.target.value);
	};

	return (
		<div className='App'>
			<ToggleButtonGroup
				type='radio'
				name='options'
				default={1}
				onChange={handleChange}>
				<ToggleButton value={1}>Radio 1</ToggleButton>
				<ToggleButton value={2}>Radio 2</ToggleButton>
				<ToggleButton value={3}>Radio 3</ToggleButton>
				<ToggleButton value={4}>Radio 4</ToggleButton>
				<ToggleButton value={5}>Radio 5</ToggleButton>
				<ToggleButton value={6}>Radio 6</ToggleButton>
				<ToggleButton value={7}>Radio 7</ToggleButton>
				<ToggleButton value={8}>Radio 8</ToggleButton>
				<ToggleButton value={9}>Radio 9</ToggleButton>
				<ToggleButton value={10}>Radio 10</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
};
export default Test;
