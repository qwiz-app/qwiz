import {
  ActionIcon,
  Box,
  createStyles,
  LoadingOverlay,
  Menu,
  Text
} from '@mantine/core';
import cn from 'classnames';
import { useSlideDelete } from 'hooks/api/slide';
import {
  DotsThreeVertical,
  NumberCircleEight,
  NumberCircleFive,
  NumberCircleFour,
  NumberCircleNine,
  NumberCircleOne,
  NumberCircleSeven,
  NumberCircleSix,
  NumberCircleThree,
  NumberCircleTwo,
  NumberCircleZero,
  TrashSimple
} from 'phosphor-react';
import { SyntheticEvent } from 'react';
import { SlideWithQuestionAndElements } from 'types/slide';

interface Props {
  slide: SlideWithQuestionAndElements;
  selectedSlideId: string;
  order: number;
  onSlideClick: (slideId: string) => void;
  onDeleteCurrentSlide?: () => void;
}

const iconNumberMap = {
  1: NumberCircleOne,
  2: NumberCircleTwo,
  3: NumberCircleThree,
  4: NumberCircleFour,
  5: NumberCircleFive,
  6: NumberCircleSix,
  7: NumberCircleSeven,
  8: NumberCircleEight,
  9: NumberCircleNine,
  0: NumberCircleZero,
};

export const SlidePreview = ({
  slide,
  order,
  selectedSlideId,
  onSlideClick,
  onDeleteCurrentSlide,
}: Props) => {
  const { classes } = useStyles();
  const { mutate: deleteSlide, isLoading: isDeleting } = useSlideDelete(
    slide.id
  );

  const numArray = String(order).split('');
  const icons = numArray.map((num) => {
    const Icon: any = iconNumberMap[num];
    return <Icon key={num} size={24} weight="duotone" />;
  });

  const isSelected = selectedSlideId === slide.id;

  const slideDeleteHandler = (e: SyntheticEvent) => {
    e.stopPropagation();
    if (isSelected) {
      onDeleteCurrentSlide?.();
    }
    deleteSlide();
  };

  const MenuTrigger = (
    <ActionIcon
      className={cn(classes.trigger, isSelected && classes.itemSelected)}
      variant="hover"
    >
      <DotsThreeVertical size={24} />
    </ActionIcon>
  );

  return (
    <Box
      className={cn(classes.box, isSelected && classes.selected)}
      onClick={() => onSlideClick(slide.id)}
    >
      <LoadingOverlay visible={isDeleting} />
      <Text
        color="dimmed"
        size="sm"
        className={cn(classes.ordinal, isSelected && classes.itemSelected)}
      >
        {icons}
        <Menu
          control={MenuTrigger}
          className={cn(classes.menu, isSelected && classes.itemSelected)}
        >
          <Menu.Item
            color="red"
            icon={<TrashSimple weight="bold" />}
            onClick={slideDeleteHandler}
          >
            Delete
          </Menu.Item>
        </Menu>
      </Text>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    margin: theme.radius.md,
    cursor: 'pointer',
    borderColor: 'transparent',
    borderWidth: 2,
    aspectRatio: '17/11',
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },

  selected: {
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.indigo[5]
        : theme.colors.indigo[2],
    background: theme.fn.rgba(theme.colors.indigo[6], 0.15),
    borderWidth: 2,

    '&:hover': {
      background: theme.fn.rgba(theme.colors.indigo[6], 0.2),
    },
  },

  menu: {
    position: 'absolute',
    top: 6,
    right: 6,
  },

  trigger: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[6]
        : theme.colors.gray[5],
  },

  ordinal: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[6]
        : theme.colors.gray[5],
  },

  itemSelected: {
    color: theme.colors.indigo[5],
  },
}));
