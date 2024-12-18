import React from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { DraggableItem } from "./DraggableItem";
import { DroppableCategory } from "./DroppableCategory";

export function CategorizeRenderer({ question, answers, setAnswers }) {
  const sensors = useSensors(useSensor(PointerSensor));

  if (!answers.categories) {
    answers.categories = {};
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const itemId = active.id;
    const categoryId = over.id;

    setAnswers({
      ...answers,
      categories: {
        ...answers.categories,
        [itemId]: categoryId,
      },
    });
  };

  const getItemCategory = (itemId) => answers.categories[itemId] || "";

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Items to Categorize */}
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="font-semibold mb-4 text-gray-100">Items to Categorize</h3>
      <div className="space-y-2">
        {question.items
          .filter((item) => !getItemCategory(item.id))
          .map((item) => (
            <DraggableItem key={item.id} id={item.id}>
              <div className="text-gray-800 bg-gray-200 p-2 rounded-lg hover:bg-gray-500 transition">
                {item.content}
              </div>
            </DraggableItem>
          ))}
      </div>
    </div>

    {/* Categories */}
    <div className="space-y-4">
      {question.categories.map((category) => (
        <DroppableCategory
          key={category}
          id={category}
          category={category}
          items={question.items.filter(
            (item) => getItemCategory(item.id) === category
          )}
        >
          <div className="bg-gray-600 p-4 rounded-lg text-gray-200">
            {category}
          </div>
        </DroppableCategory>
      ))}
    </div>
  </div>
</DndContext>
  );
}
