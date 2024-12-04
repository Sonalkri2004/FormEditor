import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormStore } from '../../store/formStore';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { DraggableItem } from './categorize/DraggableItem';
import { CategoryColumn } from './categorize/CategoryColumn';
import { Plus, X } from 'lucide-react';

export function CategorizeContent({ question }) {
  const { updateQuestion } = useFormStore();
  const [newCategory, setNewCategory] = useState('');
  const [newItem, setNewItem] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const updatedQuestion = {
      ...question,
      categories: [...(question.categories || []), newCategory.trim()],
    };
    updateQuestion(question.id, updatedQuestion);
    setNewCategory('');
  };

  const handleRemoveCategory = (categoryToRemove) => {
    const updatedQuestion = {
      ...question,
      categories: (question.categories || []).filter(cat => cat !== categoryToRemove),
      items: (question.items || []).filter(item => item.category !== categoryToRemove),
    };
    updateQuestion(question.id, updatedQuestion);
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    
    const updatedQuestion = {
      ...question,
      items: [...(question.items || []), {
        id: crypto.randomUUID(),
        content: newItem.trim(),
        category: '',
      }],
    };
    updateQuestion(question.id, updatedQuestion);
    setNewItem('');
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const itemId = active.id;
    const category = over.id;
    
    const updatedQuestion = {
      ...question,
      items: (question.items || []).map(item =>
        item.id === itemId ? { ...item, category } : item
      ),
    };
    updateQuestion(question.id, updatedQuestion);
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Uncategorized Items</h3>
            <div className="space-y-2">
              {(question.items || [])
                .filter(item => !item.category)
                .map(item => (
                  <DraggableItem key={item.id} id={item.id}>
                    {item.content}
                  </DraggableItem>
                ))}
            </div>
          </div>

          {(question.categories || []).map(category => (
            <CategoryColumn
              key={category}
              category={category}
              items={(question.items || []).filter(item => item.category === category)}
              onRemove={() => handleRemoveCategory(category)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

CategorizeContent.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['categorize']).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      category: PropTypes.string,
    })),
  }).isRequired,
};