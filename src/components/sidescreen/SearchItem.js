import React from 'react';

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
			{FirstName} {LastName}/{AnimalName}/{Breed}
		</div>
	)
};

export default SearchItem;