import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableItem } from "./DraggableItem";

export function DroppableCategory({ id, category, items }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "#f0f8ff" : "white",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
    >
      <h3 className="font-semibold mb-4">{category}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id}>
            {item.content}
          </DraggableItem>
        ))}
      </div>
    </div>
  );
}
