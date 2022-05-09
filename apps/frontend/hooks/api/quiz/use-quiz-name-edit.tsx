import { SyntheticEvent, useRef, useState } from 'react';
import { QuizWithOrganization } from 'types/organization';
import { useQuizUpdate } from '.';

export const useQuizNameEdit = (quiz: QuizWithOrganization) => {
  const DEFAULT_QUIZ_NAME = 'Untitled';
  const nameRef = useRef<HTMLInputElement>();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(quiz.name);
  const [clickedFromMenu, setClickedFromMenu] = useState(false);

  const { mutate, isLoading } = useQuizUpdate(quiz.id);

  const peformNameUpdate = () => {
    if (editedName.trim() === quiz.name) {
      setIsEditMode(false);
      return;
    }
    if (editedName.trim() === '') {
      setEditedName(DEFAULT_QUIZ_NAME);
    }

    mutate(
      { name: editedName.trim() || DEFAULT_QUIZ_NAME },
      {
        onSettled: () => {
          setIsEditMode(false);
        },
      }
    );
  };

  const onClickToEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    setEditedName(quiz.name);
    setIsEditMode(true);

    if (e.currentTarget?.id === 'quiz-card-name') {
      setClickedFromMenu(false);
    } else {
      setClickedFromMenu(true);
    }

    setTimeout(() => nameRef.current?.select(), 0);
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      peformNameUpdate();
    } else if (e.key === 'Escape') {
      setEditedName(quiz.name);
      setIsEditMode(false);
    }
  };

  const onBlurHandler = (e: SyntheticEvent) => {
    // workaround to get blur working when clicking from menu
    if (clickedFromMenu) {
      nameRef.current?.select();
    } else {
      setTimeout(() => {
        peformNameUpdate();
      }, 0);
    }
    setClickedFromMenu(false);
  };

  return {
    editedName,
    setEditedName,
    isEditMode,
    isLoading,
    peformNameUpdate,
    onClickToEdit,
    onKeyUp,
    onBlurHandler,
    nameRef,
  };
};

interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
  altKey: boolean;
  /** @deprecated */
  charCode: number;
  ctrlKey: boolean;
  getModifierState(key: string): boolean;
  key: string;
  /** @deprecated */
  keyCode: number;
  locale: string;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  /** @deprecated */
  which: number;
}
