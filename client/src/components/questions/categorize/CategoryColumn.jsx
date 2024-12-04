import React from 'react';
import PropTypes from 'prop-types';
import { useDroppable } from '@dnd-kit/core';
import { DraggableItem } from './DraggableItem';
import { X } from 'lucide-react';

export function CategoryColumn({ category, items, onRemove }) {
  const { setNodeRef } = useDroppable({
    id: category,
  });

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{category}</h3>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          <X size={20} />
        </button>
      </div>
      <div ref={setNodeRef} className="space-y-2 min-h-[100px]">
        {items.map(item => (
          <DraggableItem key={item.id} id={item.id}>
            {item.content}
          </DraggableItem>
        ))}
      </div>
    </div>
  );
}

CategoryColumn.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string,
  })).isRequired,
  onRemove: PropTypes.func.isRequired,
};