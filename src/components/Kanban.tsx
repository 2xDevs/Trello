"use client";

import React, { useState, DragEvent } from "react";
import { motion } from "framer-motion";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SheetTrigger } from "@/components/ui/sheet";
import {
  CardProps,
  CardType,
  ColumnProps,
  ColumnType,
  DropIndicatorProps,
} from "@/types/types";
import { setStatus, useAppDispatch } from "@/store/store";
import { useTodoActions } from "@/hooks/useTodoActions";

export const Kanban = () => {
  return (
    <div className="w-full px-4">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex h-full w-full flex-1 gap-8">
      <Column status="To do" cards={cards} setCards={setCards} />
      <Column status="In progress" cards={cards} setCards={setCards} />
      <Column status="Under review" cards={cards} setCards={setCards} />
      <Column status="Finished" cards={cards} setCards={setCards} />
    </div>
  );
};

const Column = ({ cards, status, setCards }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    if (!card.id) {
      console.log("No card Id");
      return;
    }
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element?.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);
    if (!el.element) {
      console.log("el value is not prersent");
      return;
    }

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${status}"]`,
      ) as unknown as HTMLElement[],
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.status === status);

  return (
    <div className="flex-1">
      <div className="sticky top-0 flex items-center justify-between px-2 py-4">
        <h3 className="text-xl">{status}</h3>
        <span className="rounded text-sm text-neutral-400">
          <Icons.StatusMenu />
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`max-h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} status={status} />
        <AddCardButton status={status} />
      </div>
    </div>
  );
};

const Card = ({
  id,
  title,
  description,
  status,
  priority,
  deadline,
  created,
  content,
  handleDragStart,
}: CardProps) => {
  if (!id) {
    console.log("No CardId");
    return;
  }
  const { handleAllTodoChanges } = useTodoActions();
  const data = {
    title,
    status,
    priority,
    deadline,
    description,
    content,
  };

  return (
    <>
      <DropIndicator beforeId={id} status={status} />
      <SheetTrigger asChild>
        <motion.div
          onClick={() => {
            console.log(data);
            handleAllTodoChanges(data);
          }}
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e: any) => handleDragStart(e, { title, id, status })}
          className="mb-4 cursor-grab rounded-lg border border-neutral-700 p-3 active:cursor-grabbing"
        >
          <div className="w-full space-y-4 text-accent-foreground">
            <div className="">
              <h3 className="text-xl font-medium text-secondary-foreground">
                {title}
              </h3>
              <p className="text-base font-normal">{description}</p>
            </div>
            <div
              className={cn(
                "w-fit rounded-xl px-2.5 py-1.5 text-white",
                (priority == "Low" && "bg-green-700") ||
                  (priority == "Medium" && "bg-yellow-500") ||
                  (priority == "Urgent" && "bg-red-700") ||
                  "",
              )}
            >
              {priority}
            </div>
            <div className="flex gap-2">
              <Icons.Time />
              <p>{deadline}</p>
            </div>
            <p>{"1 hr ago"}</p>
          </div>
        </motion.div>
      </SheetTrigger>
    </>
  );
};

const DropIndicator = ({ beforeId, status }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={status}
      className="h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const AddCardButton = ({ status }: { status: ColumnType }) => {
  const { handleStatusChange } = useTodoActions();

  return (
    <>
      <SheetTrigger asChild>
        <Button
          onClick={() => handleStatusChange(status)}
          className="w-full rounded-xl bg-neutral-900 px-3 py-5 hover:bg-neutral-800"
        >
          <div className="flex w-full items-center justify-between gap-2">
            <p className="text-base font-normal">Add New</p>
            <div>
              <Icons.Plus color="#fff" className="h-6 w-6" />
            </div>
          </div>
        </Button>
      </SheetTrigger>
    </>
  );
};

const DEFAULT_CARDS: CardType[] = [
  // TODO
  {
    title: "Implement User Authentication",
    description:
      "Develop and integrate user authentication using email and password.",
    id: "1",
    priority: "Urgent",
    deadline: "2024-08-15",
    created: new Date(),
    status: "To do",
  },

  // IN PROGRESS
  {
    title: "Design Home Page UI",
    description:
      "Develop and integrate user authentication using email and password.",
    id: "5",
    priority: "Medium",
    deadline: "2024-08-15",
    created: new Date(),
    status: "In progress",
  },
  {
    title: "Condect User Feedback Survey",
    description: "Collect and analyze user feedback to improve app features.",
    id: "6",
    priority: "Low",
    deadline: "2024-08-05",
    created: new Date(),
    status: "In progress",
  },

  // UNDER REVIEW
  {
    title: "Integrate Cloud Storage",
    description: "Enable cloud storage for note backup and synchronization.",
    id: "8",
    priority: "Urgent",
    deadline: "2024-08-20",
    created: new Date(),
    status: "Under review",
  },

  // DONE
  {
    title: "Test Cross-browser Compactability",
    description:
      "Ensure the app works seamlessly across different web browsers.",
    id: "10",
    priority: "Medium",
    deadline: "2024-07-30",
    created: new Date(),
    status: "Finished",
  },
];
