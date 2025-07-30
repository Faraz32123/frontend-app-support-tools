import React from 'react';
import { ArrowDropDown, ArrowDropUpDown } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';

const SortableHeader = ({ id, label, sortBy, setSortBy }) => {
  const isSorted = sortBy[0]?.id === id;
  const isDesc = sortBy[0]?.desc;

  const handleClick = () => {
    setSortBy((prev) => {
      if (prev.length === 0 || prev[0].id !== id) {
        return [{ id, desc: false }]; // ascending
      }
      if (!prev[0].desc) {
        return [{ id, desc: true }]; // descending
      }
      return []; // unsorted
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {label}
      {isSorted ? (
        isDesc ? (
          <ArrowDropDown />
        ) : (
          <ArrowDropDown style={{ transform: 'rotate(180deg)' }} />
        )
      ) : (
        <ArrowDropUpDown />
      )}
    </div>
  );
};

SortableHeader.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sortBy: PropTypes.array.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default SortableHeader;
