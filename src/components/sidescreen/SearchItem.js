import React from 'react';
import ReactTooltip from 'react-tooltip';

const SearchItem = ({
	selected,
	FirstName,
	LastName,
	AnimalName,
	Breed
}) => {
	const classes = selected ? 'item selected' : 'item';
	return (
		<div className = {classes}>
			<span ><b>{FirstName} {LastName}</b>/<b>{AnimalName}</b><hr></hr></span>
		</div>
	)
};

export default SearchItem;