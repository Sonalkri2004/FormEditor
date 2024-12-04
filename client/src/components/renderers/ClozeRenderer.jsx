import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

export default function ClozeRenderer({ question }) {
  const [answers, setAnswers] = useState(
    question.blanks.map(() => null) // Initialize blanks with null values
  );
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle Drag Start
  const handleDragStart = (event) => {
    setActiveId(event.active.id); // Set the dragged word's ID
  };

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const draggedWord = active.id;
    const blankIndex = parseInt(over.id); // Get the index of the blank space

    // Update answers if valid drop target
    if (!isNaN(blankIndex)) {
      const updatedAnswers = [...answers];
      updatedAnswers[blankIndex] = draggedWord;

      setAnswers(updatedAnswers);
    }

    setActiveId(null);
  };

  // Generate text with blanks
  const renderTextWithBlanks = () => {
    const parts = question.text.split(/(_+)/); // Split the text by underscores
    let blankCounter = 0;

    return parts.map((part, index) => {
      if (part.startsWith("_")) {
        const blankIndex = blankCounter++;
        return (
          <DroppableBlank
            key={index}
            id={blankIndex.toString()}
            value={answers[blankIndex]}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Get unused words (not already placed in blanks)
  const unusedWords = question.blanks.filter((word) => !answers.includes(word));

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Render the Question Text with Blanks */}
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{renderTextWithBlanks()}</p>
        </div>

        {/* Render Draggable Words */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
          {unusedWords.map((word) => (
            <DraggableWord key={word} id={word}>
              {word}
            </DraggableWord>
          ))}
        </div>

        {/* Render Drag Overlay */}
        <DragOverlay>
          {activeId && (
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              {activeId}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// Draggable Word Component
function DraggableWord({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px)`
      : undefined,
    // position: transform ? "fixed" : "relative",
    zIndex: transform ? 1000 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-move hover:bg-blue-200 transition-colors inline-block"
    >
      {children}
    </div>
  );
}

// Droppable Blank Component
function DroppableBlank({ id, value }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className={`inline-block min-w-[100px] px-3 py-1 mx-1 border-b-2 text-center ${
        isOver
          ? "border-blue-500 bg-blue-100"
          : value
          ? "border-green-500 bg-green-50"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      {value || "_____"}
    </span>
  );
}
