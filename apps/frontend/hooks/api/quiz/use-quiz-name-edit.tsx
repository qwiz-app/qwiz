import { useRef, useState, useEffect, SyntheticEvent } from 'react';
import { QuizWithOrganization } from 'types/organization';
import { useQuizUpdate } from '.';

export const useQuizNameEdit = (quiz: QuizWithOrganization) => {
  const DEFAULT_QUIZ_NAME = 'Untitled';
  const nameRef = useRef<HTMLInputElement>();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(quiz.name);

  const { mutate, isLoading } = useQuizUpdate(quiz.id);

  useEffect(() => {
    // reset quiz name when exited the mode
    if (!isEditMode) {
      setEditedName(quiz.name);
    }
  }, [isEditMode]);

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
    setTimeout(() => {
      nameRef.current?.focus();
      nameRef.current?.select();
    }, 0);
  };

  // TODO: typescript events ugh
  const onKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      peformNameUpdate();
    } else if (e.key === 'Escape') {
      setEditedName(quiz.name);
      setIsEditMode(false);
    }
  };

  const onBlurHandler = (e: SyntheticEvent) => {
    setTimeout(() => {
      peformNameUpdate();
    }, 0);
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
